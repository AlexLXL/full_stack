var vueReactivity = (function (exports) {
    'use strict';

    const isObject = (v) => typeof v === 'object' && v !== null;

    const reactiveGet = createGet(false, false);
    const shallowReactiveGet = createGet(false, true);
    const readonlyGet = createGet(true, false);
    const shallowReadonlyGet = createGet(true, true);
    function createGet(isReadonly = false, isShallow = false) {
        // target: 目标对象、key: 需要获取的属性、receiver: 目标对象使用的proxy
        return function get(target, key, receiver) {
            let value = Reflect.get(target, key, receiver);
            if (isShallow) {
                return value;
            }
            if (isObject(value)) {
                return isReadonly ? readonly(value) : reactive(value); // 递归代理
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
            let res = Reflect.set(target, key, value, receiver);
            console.log(`设置值`);
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

    exports.reactive = reactive;
    exports.readonly = readonly;
    exports.shallowReactive = shallowReactive;
    exports.shallowReadonly = shallowReadonly;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=reactivity.global.js.map
