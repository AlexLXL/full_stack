var vueReactivity = (function (exports) {
    'use strict';

    const isObject = (v) => typeof v === 'object' && v !== null;
    const isArray = Array.isArray;
    const hasChange = (oldValue, newValue) => oldValue !== newValue;
    const isInteger = (key) => parseInt(key) + '' === key; // 数组的下标
    const hasOwn = (target, key) => Object.prototype.hasOwnProperty.call(target, key);

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
        return effect;
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

    exports.effect = effect;
    exports.reactive = reactive;
    exports.readonly = readonly;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=reactivity.global.js.map
