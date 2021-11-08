import {isObject} from "@vue/shared";
import {reactiveHandler, shallowReactiveHandler, readonlyHandler, shallowReadonlyHandler} from "./baseHandlers"

let reactiveWeakMap = new WeakMap()
let shallowReactiveHandlerWeakMap = new WeakMap()
let readonlyWeakMap = new WeakMap()
let shallowReadonlyWeakMap = new WeakMap()
export function reactive(target: object) {
    return createReactiveObject(target, reactiveHandler, reactiveWeakMap)
}
export function shallowReactive(target: object) {
    return createReactiveObject(target, shallowReactiveHandler, shallowReactiveHandlerWeakMap)
}
export function readonly(target: object) {
    return createReactiveObject(target, readonlyHandler, readonlyWeakMap)
}
export function shallowReadonly(target: object) {
    return createReactiveObject(target, shallowReadonlyHandler, shallowReadonlyWeakMap)
}

function createReactiveObject(target, baseHandlers, proxyMap) {
    if (!isObject(target)) return target

    const exitsProxy = proxyMap.get(target)
    if (exitsProxy) return exitsProxy

    const proxy = new Proxy(target,  baseHandlers)
    proxyMap.set(target, proxy)

    return proxy
}