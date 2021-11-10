var vueRuntimeDom = (function (exports) {
    'use strict';

    const nodeOps = {
        createElement(tagName) {
            return document.createElement(tagName);
        },
        remove(child) {
            const parent = child.parentNode;
            if (parent) {
                parent.removeChild(child);
            }
        },
        querySelector(selector) {
            return document.querySelector(selector);
        },
        insert(child, parent, anchor = null) {
            parent.insertBefore(child, anchor);
        },
        createText(text) {
            return document.createTextNode(text);
        },
        setElementText(el, text) {
            el.textContent = text; // innerHTML会有风险
        },
        setText(node, text) {
            node.nodeValue = text;
        }
    };

    function patchClass(el, newValue) {
        if (newValue === null) {
            newValue = '';
        }
        el.className = newValue;
    }

    function patchStyle(el, oldValue, newValue) {
        const style = el.style;
        if (newValue === null) {
            el.removeAttribute('style');
        }
        else {
            if (oldValue) {
                for (let k in oldValue) {
                    if (newValue[k] === null) {
                        style[k] = '';
                    }
                }
            }
            for (let k in newValue) {
                style[k] = newValue[k];
            }
        }
    }

    function patchEvent(el, key, newValue) {
        const invokers = el._vei || (el._vei = {}); // 缓存起来
        const exists = invokers[key];
        if (exists && newValue) {
            exists.value = newValue;
        }
        else {
            const eventName = key.slice(2).toLowerCase();
            if (newValue) {
                const fn = invokers[key] = createInvoker(newValue);
                el.addEventListener(eventName, fn);
            }
            else {
                el.removeEventListener(eventName, exists);
            }
        }
    }
    function createInvoker(fn) {
        const invoker = (e) => { invoker.value(e); };
        invoker.value = fn;
        return invoker;
    }

    function patchAttr(el, key, newValue) {
        if (newValue === null) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, newValue);
        }
    }

    function patchProp(el, key, oldValue, newValue) {
        switch (key) {
            case 'class':
                patchClass(el, newValue);
                break;
            case 'style':
                patchStyle(el, oldValue, newValue);
                break;
            default:
                if (/^on[a-z]/.test(key)) {
                    patchEvent(el, key, newValue);
                }
                else {
                    patchAttr(el, key, newValue);
                }
        }
    }

    const isObject = v => typeof v === 'object' && v !== null;
    const isString = v => typeof v === 'string';
    const isFunction = v => typeof v === 'function';
    const isArray = Array.isArray;
    const extend = Object.assign;
    const hasChange = (oldValue, newValue) => oldValue !== newValue;
    const isInteger = (key) => parseInt(key) + '' === key; // 数组的下标
    const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

    /**
     * 创建虚拟node
     * @param type 可能传组件配置setup, 可能传h创建的 “div” 字符串
     * @param props
     * @param children
     */
    function createVnode(type, props, children = null) {
        let shapeFlag = isString(type) ? 1 /* ELEMENT */ :
            isObject(type) ? 4 /* STATEFUL_COMPONENT */ :
                0;
        let vnode = {
            __v_isVnode: true,
            type,
            props,
            children,
            el: null,
            key: props && props.key,
            shapeFlag
        };
        normalizeChildren(vnode, children);
        return vnode;
    }
    function normalizeChildren(vnode, children) {
        if (children === null) ;
        else if (isArray(children)) {
            vnode.shapeFlag |= 16 /* ARRAY_CHILDREN */;
        }
        else {
            vnode.shapeFlag |= 8 /* TEXT_CHILDREN */;
        }
    }

    function createAppAPI(render) {
        return function createApp(rootComponent, props) {
            let app = {
                _component: rootComponent,
                _rootProps: props,
                _container: null,
                use() { },
                mixin() { },
                component() { },
                mount(container) {
                    let vnode = createVnode(rootComponent, props);
                    render(vnode, container);
                    app._container = container;
                }
            };
            return app;
        };
    }

    /**
     * 创建组件实例
     * @param vnode
     */
    function createComponentInstance(vnode) {
        let instance = {
            vnode,
            data: {},
            attrs: {},
            props: {},
            slots: {},
            render: null,
            setupState: {},
            subTree: null,
            isMounted: false,
            bc: null,
            m: null,
            ctx: {},
            proxy: {},
            update: null
        };
        instance.ctx = { _: instance };
        return instance;
    }
    /**
     * 添加setup数据到实例
     * @param vnode
     */
    function setupComponent(instance) {
        let isStateful = isStatefulComponent(instance.vnode);
        isStateful ? setupStatefulComponent(instance) : undefined;
    }
    function isStatefulComponent(vnode) {
        return vnode.shapeFlag & 4 /* STATEFUL_COMPONENT */;
    }
    function setupStatefulComponent(instance) {
        instance.proxy = new Proxy(instance.ctx, {
            get({ _: instance }, key) {
                let { setupState, data, props } = instance;
                if (hasOwn(setupState, key)) {
                    return setupState[key];
                }
                else if (hasOwn(data, key)) {
                    return data[key];
                }
                else if (hasOwn(props, key)) {
                    return props[key];
                }
            },
            set({ _: instance }, key, value) {
                let { setupState, data, props } = instance;
                if (hasOwn(setupState, key)) {
                    setupState[key] = value;
                }
                else if (hasOwn(data, key)) {
                    data[key] = value;
                }
                else if (hasOwn(props, key)) {
                    props[key] = value;
                }
                return true;
            }
        });
        let Component = instance.vnode.type; // 整个组件配置
        let { setup } = Component;
        if (setup) {
            let context = createContext(instance);
            let setupReturn = setup(instance.props, context);
            handleSetupReturn(instance, setupReturn);
        }
    }
    function createContext(instance) {
        return {
            attrs: instance.attrs,
            slots: instance.slots,
            emit: () => { },
            expose: () => { }
            // 如果用户使用了ref属性放到了组件上，expose默认拿到组件实例
            // 但如果定义了expose, 默认拿到expose
        };
    }
    function handleSetupReturn(instance, setupReturn) {
        if (isFunction(setupReturn)) {
            instance.render = setupReturn;
        }
        else if (isObject(setupReturn)) {
            instance.setupState = setupReturn;
        }
        finishComponentSetup(instance);
    }
    /**
     * 完善实例
     * 1.补充render函数(有render直接用render,没render用template生成)
     */
    function finishComponentSetup(instance) {
        let component = instance.vnode.type;
        if (!instance.render) {
            if (!component.render && component.template) ;
            instance.render = component.render;
        }
    }

    let effectsQueue = new Set();
    let add = (effectsToAdd) => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => effectsQueue.add(effect));
        }
    };
    function effect(fn, options = { lazy: false }) {
        let effect = createReactiveEffect(fn, options);
        if (!options.lazy) {
            effect();
        }
        return effect;
    }
    let uid = 0;
    let activeEffect;
    function createReactiveEffect(fn, options) {
        const effect = function () {
            activeEffect = effect;
            fn();
            activeEffect = null;
        };
        effect.id = uid++;
        effect._isEffect = true;
        effect.raw = fn;
        effect.deps = [];
        effect.options = options;
        return effect; // 返回一个套娃(fn)的函数
    }
    /**
     * 收集依赖的effect
     * 更新依赖的effect
     */
    let targetMap = new WeakMap();
    function track(target, type, key) {
        // effect里拿值才有activeEffect
        if (!activeEffect)
            return;
        let depsMap = targetMap.get(target);
        if (!depsMap) {
            targetMap.set(target, depsMap = new Map());
        }
        let dep = depsMap.get(key);
        if (!dep) {
            depsMap.set(key, dep = new Set());
        }
        if (!dep.has(activeEffect)) {
            dep.add(activeEffect);
        }
    }
    function trigger(target, key, value, type) {
        let depsMap = targetMap.get(target);
        if (!depsMap)
            return;
        /**
         * 1.修改数组的length触发更新 [这时value为修改后数组长度]
         */
        if (isArray(target) && key === 'length') {
            // 边界处理: effect收集数组某个下标idx; 代码修改数组length为0或小于idx的值
            depsMap.forEach((effects, key) => {
                if (key === 'length' || value - 1 < key) {
                    add(effects);
                }
            });
        }
        else {
            /**
             * 2.数组新增和对象新增（使用length的effects）
             * 3.基础数据/引用数据的值发生改变
             */
            if (type === 'add') {
                if (isArray(target) && isInteger(key)) {
                    const effects = depsMap.get('length');
                    add(effects);
                }
                else {
                    add(depsMap.get(key));
                }
            }
            else {
                const effects = depsMap.get(key);
                add(effects);
            }
        }
        effectsQueue.forEach((effect) => effect());
    }

    const reactiveGet = createGet(false, false);
    const shallowReactiveGet = createGet(false, true);
    const readonlyGet = createGet(true, false);
    const shallowReadonlyGet = createGet(true, true);
    function createGet(isReadonly = false, isShallow = false) {
        // target: 目标对象、key: 需要获取的属性、receiver: 目标对象使用的proxy
        return function get(target, key, receiver) {
            // console.log("get::",target, key)
            let value = Reflect.get(target, key, receiver);
            if (!isReadonly) {
                // --收集依赖--
                track(target, 'get', key);
            }
            if (isShallow) {
                return value;
            }
            if (isObject(value)) {
                return isReadonly ? readonly(value) : reactive(value); // 递归代理[取值的时候才进行,所以性能更优★]
            }
            return value;
        };
    }
    const reactiveSet = createSet();
    const shallowReactiveSet = createSet();
    const readonlySet = createSet();
    const shallowReadonlySet = createSet();
    function createSet() {
        return function set(target, key, value, receiver) {
            let oldValue = target[key];
            // 下面这行: 判断是否已经有这个下标 || 已经有.length这个属性
            let hadKey = isArray(target) && isInteger(key) ? key < target.length : hasOwn(target, key);
            // console.log("set::",target, key, value, `oldValue: ${oldValue}`, hadKey)
            let res = Reflect.set(target, key, value, receiver);
            /**
             * 1.数组新增（但新增的本来就没有effects鸭, 因此要用length的effects更新）
             * 2.基础数据/引用数据的值发生改变
             */
            if (!hadKey) {
                trigger(target, key, value, 'add');
            }
            else if (hasChange(oldValue, value)) {
                trigger(target, key, value, 'set');
            }
            return res;
        };
    }
    const reactiveHandler = {
        get: reactiveGet,
        set: reactiveSet
    };
    const shallowReactiveHandler = {
        get: shallowReactiveGet,
        set: shallowReactiveSet
    };
    const readonlyHandler = {
        get: readonlyGet,
        set: readonlySet
    };
    const shallowReadonlyHandler = {
        get: shallowReadonlyGet,
        set: shallowReadonlySet
    };

    let reactiveWeakMap = new WeakMap();
    let shallowReactiveHandlerWeakMap = new WeakMap();
    let readonlyWeakMap = new WeakMap();
    let shallowReadonlyWeakMap = new WeakMap();
    function reactive(target) {
        return createReactiveObject(target, reactiveHandler, reactiveWeakMap);
    }
    function shallowReactive(target) {
        return createReactiveObject(target, shallowReactiveHandler, shallowReactiveHandlerWeakMap);
    }
    function readonly(target) {
        return createReactiveObject(target, readonlyHandler, readonlyWeakMap);
    }
    function shallowReadonly(target) {
        return createReactiveObject(target, shallowReadonlyHandler, shallowReadonlyWeakMap);
    }
    function createReactiveObject(target, baseHandlers, proxyMap) {
        if (!isObject(target))
            return target;
        const exitsProxy = proxyMap.get(target);
        if (exitsProxy)
            return exitsProxy;
        const proxy = new Proxy(target, baseHandlers);
        proxyMap.set(target, proxy);
        return proxy;
    }

    function ref(value) {
        return createRef(value, false);
    }
    function createRef(value, isShallow = false) {
        return new RefImpl(value, isShallow);
    }
    const convert = val => isObject(val) ? reactive(val) : val;
    class RefImpl {
        rawValue;
        isShallow;
        _value;
        constructor(rawValue, isShallow) {
            this.rawValue = rawValue;
            this.isShallow = isShallow;
            this._value = isShallow ? rawValue : convert(rawValue);
        }
        get value() {
            track(this, 'get', 'value');
            return this._value;
        }
        set value(newValue) {
            if (hasChange(newValue, this.rawValue)) {
                this.rawValue = newValue;
                this._value = this.isShallow ? newValue : convert(newValue);
                trigger(this, 'value', newValue, 'set');
            }
        }
    }
    function toRef(target, key) {
        return new ObjectRefImpl(target, key);
    }
    class ObjectRefImpl {
        target;
        key;
        constructor(target, key) {
            this.target = target;
            this.key = key;
        }
        get value() {
            track(this, 'get', 'value');
            return this.target[this.key];
        }
        set value(newValue) {
            this.target[this.key] = newValue;
            trigger(this, 'value', newValue, 'set');
        }
    }
    function toRefs(object) {
        let ret = isArray(object) ? Array(object.length) : {};
        for (let key in object) {
            ret[key] = toRef(object, key);
        }
        return ret;
    }

    function createRender(renderOption) {
        // Vnode -> realDOM
        // [和vue2一样都是render生成vnode, vnode进行patch然后生成realDOM]
        // [下面这个render应该理解为强刷页面的函数, 真实组件render应该是instance.render]
        const render = (vnode, container) => {
            patch(null, vnode, container);
        };
        const patch = (vnode1, vnode2, container) => {
            // if (vnode1 !== null) {
            //     // TODO: diff
            // }else {
            let { shapeFlag } = vnode2;
            if (shapeFlag & 1 /* ELEMENT */) {
                processElement(vnode1, vnode2, container);
            }
            else if (shapeFlag & 4 /* STATEFUL_COMPONENT */) {
                processComponent(vnode1, vnode2, container);
            }
            // }
        };
        function processElement(vnode1, vnode2, container) {
            if (vnode1 === null) {
                mountElement(vnode2, container);
            }
        }
        function processComponent(vnode1, vnode2, container) {
            if (vnode1 === null) {
                mountComponent(vnode2, container);
            }
        }
        let { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, setText: hostSetText, setElementText: hostSetElementText, } = renderOption;
        function mountElement(vnode2, container) {
            let { props, type, children, shapeFlag } = vnode2;
            let el = vnode2.el = hostCreateElement(type);
            if (props) {
                for (let k in props) {
                    hostPatchProp(el, k, null, props[k]);
                }
            }
            if (shapeFlag & 8 /* TEXT_CHILDREN */) {
                hostSetElementText(el, children);
            }
            else if (shapeFlag & 16 /* ARRAY_CHILDREN */) {
                mountChildren(children, el);
            }
            hostInsert(el, container);
        }
        function mountChildren(children, el) {
            for (let i = 0; i < children.length; i++) {
                patch(null, children[i], el);
            }
        }
        function mountComponent(vnode2, container) {
            let instance = createComponentInstance(vnode2); // 1.创建组件实例对象
            setupComponent(instance); // 2.将setup数据添加到组件实例对象
            setupRenderEffect(instance, container); // 3.添加渲染effect
        }
        function setupRenderEffect(instance, container) {
            instance.update = effect(() => {
                if (!instance.isMounted) {
                    // 初渲染, effect函数内执行render, render内的变量就会进行依赖收集
                    let subTree = instance.subTree = instance.render.call(instance.proxy, instance.proxy);
                    // console.log(`初次渲染虚拟节点:`, subTree)
                    patch(null, subTree, container);
                    instance.isMounted = true;
                }
                else {
                    // TODO: 数据更新, diff算法
                    instance.subTree;
                    instance.render.call(instance.proxy, instance.proxy);
                    // console.log(prevSubTree, nextSubTree)
                    // TODO: 数据更新, diff算法
                    // patch(prevSubTree, nextSubTree, container)
                }
            });
        }
        return {
            createApp: createAppAPI(render)
        };
    }

    /**
     * h(标签, 属性)
     * h(标签, 属性, 值)
     * h(标签, 值)
     * h(标签, [值, 值])
     * h(标签, 属性, 值, 值)
     * @param type
     * @param propsOrChildren
     * @param children
     */
    function h(type, propsOrChildren, children) {
        let len = arguments.length;
        if (len === 2) {
            if (isObject(propsOrChildren) && !isArray(propsOrChildren)) {
                return createVnode(type, propsOrChildren);
            }
            else {
                return createVnode(type, null, propsOrChildren);
            }
        }
        else if (len == 3) {
            return createVnode(type, propsOrChildren, children);
        }
        else if (len > 3) {
            return createVnode(type, propsOrChildren, Array.from(arguments).slice(2));
        }
    }

    /**
     * runtime-dom: 主要是对dom的一些操作
     */
    let renderOptions = extend(nodeOps, { patchProp });
    function createApp(rootComponent, props = null) {
        // core返回createApp和mount, 然后进行dom平台的封装
        const app = createRender(renderOptions).createApp(rootComponent, props);
        let { mount } = app;
        app.mount = function (container) {
            container = nodeOps.querySelector(container);
            container.innerHTML = '';
            let proxy = mount(container);
            return proxy;
        };
        return app;
    }

    exports.createApp = createApp;
    exports.createRender = createRender;
    exports.effect = effect;
    exports.h = h;
    exports.reactive = reactive;
    exports.readonly = readonly;
    exports.ref = ref;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;
    exports.toRef = toRef;
    exports.toRefs = toRefs;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=runtime-dom.global.js.map
