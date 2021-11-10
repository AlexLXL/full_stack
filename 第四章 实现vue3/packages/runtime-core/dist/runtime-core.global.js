var vueRuntimeCore = (function (exports) {
    'use strict';

    const isObject = v => typeof v === 'object' && v !== null;
    const isString = v => typeof v === 'string';
    const isFunction = v => typeof v === 'function';
    const isArray = Array.isArray;
    const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

    /**
     * 创建虚拟node
     * @param type 可能传组件配置setup, 可能传h创建的div
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

    function effect(fn, options = { lazy: false }) {
        let effect = createReactiveEffect(fn, options);
        if (!options.lazy) {
            effect();
        }
        return effect;
    }
    let uid = 0;
    function createReactiveEffect(fn, options) {
        const effect = function () {
            fn();
        };
        effect.id = uid++;
        effect._isEffect = true;
        effect.raw = fn;
        effect.deps = [];
        effect.options = options;
        return effect; // 返回一个套娃(fn)的函数
    }

    function createRender(renderOption) {
        // Vnode -> realDOM
        // [和vue2一样都是render生成vnode, vnode进行patch然后生成realDOM]
        // [下面这个render应该理解为页面init函数, 真实组件render应该是instance.render]
        const render = (vnode, container) => {
            patch(null, vnode);
        };
        const patch = (vnode1, vnode2, container) => {
            // if (vnode1 !== null) {
            //     // TODO: diff
            // }else {
            let { shapeFlag } = vnode2;
            if (shapeFlag & 1 /* ELEMENT */) ;
            else if (shapeFlag & 4 /* STATEFUL_COMPONENT */) {
                processComponent(vnode1, vnode2);
            }
            // }
        };
        function processComponent(vnode1, vnode2, container) {
            if (vnode1 === null) {
                mountComponent(vnode2);
            }
        }
        function mountComponent(vnode2, container) {
            let instance = createComponentInstance(vnode2); // 1.创建组件实例对象
            setupComponent(instance); // 2.将setup数据添加到组件实例对象
            setupRenderEffect(instance); // 3.添加渲染effect
        }
        function setupRenderEffect(instance, container) {
            instance.update = effect(() => {
                if (!instance.isMounted) {
                    // 初渲染, effect函数内执行render, render内的变量就会进行依赖收集
                    let subTree = instance.subTree = instance.render.call(instance.proxy, instance.proxy);
                    patch(null, subTree);
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

    exports.createRender = createRender;
    exports.h = h;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=runtime-core.global.js.map
