import get = Reflect.get;
import {hasChange, hasOwn, isArray, isInteger, isObject} from "@vue/shared";
import {reactive, readonly} from "./reactive";
import {track, trigger} from "./effect";

const reactiveGet = createGet(false, false)
const shallowReactiveGet = createGet(false, true)
const readonlyGet = createGet(true, false)
const shallowReadonlyGet = createGet(true, true)
function createGet(isReadonly = false, isShallow = false) {
    // target: 目标对象、key: 需要获取的属性、receiver: 目标对象使用的proxy
    return function get(target, key, receiver) {
        // console.log("get::",target, key)
        let value = Reflect.get(target, key, receiver)
        if (!isReadonly) {
            // --收集依赖--
            track(target, 'get', key)
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
        let oldValue = target[key]
        // 下面这行: 判断是否已经有这个下标 || 已经有.length这个属性
        let hadKey = isArray(target) && isInteger(key) ? key < target.length : hasOwn(target, key)
        // console.log("set::",target, key, value, `oldValue: ${oldValue}`, hadKey)
        let res = Reflect.set(target, key, value, receiver)
        /**
         * 1.数组新增（但新增的本来就没有effects鸭, 因此要用length的effects更新）
         * 2.基础数据/引用数据的值发生改变
         */
        if (!hadKey) {
            trigger(target, key, value, 'add')
        }else if (hasChange(oldValue, value)) {
            trigger(target, key, value, 'set')
        }
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