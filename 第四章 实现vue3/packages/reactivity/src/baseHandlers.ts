import get = Reflect.get;
import {isObject} from "@vue/shared";
import {reactive, readonly} from "./reactive";

const reactiveGet = createGet(false, false)
const shallowReactiveGet = createGet(false, true)
const readonlyGet = createGet(true, false)
const shallowReadonlyGet = createGet(true, true)
function createGet(isReadonly = false, isShallow = false) {
    // target: 目标对象、key: 需要获取的属性、receiver: 目标对象使用的proxy
    return function get(target, key, receiver) {
        let value = Reflect.get(target, key, receiver)
        if (!isReadonly) {
            // --收集依赖--
        }
        if (isShallow) {
            return value
        }
        if (isObject(value)) {
            return isReadonly ? readonly(value) : reactive(value)   // 递归代理[取值的时候才进行,所以性能更优★]
        }
        return value
    }
}

const reactiveSet = createSet()
const shallowReactiveSet = createSet()
const readonlySet = createSet()
const shallowReadonlySet = createSet()
function createSet() {
    return function set(target, key, value, receiver) {
        let res = Reflect.set(target, key, value, receiver)
        return res
    }
}

export const reactiveHandler = {
    get: reactiveGet,
    set: reactiveSet
}
export const shallowReactiveHandler = {
    get: shallowReactiveGet,
    set: shallowReactiveSet
}
export const readonlyHandler = {
    get: readonlyGet,
    set: readonlySet
}
export const shallowReadonlyHandler = {
    get: shallowReadonlyGet,
    set: shallowReadonlySet
}