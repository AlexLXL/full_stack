import {isArray, isObject} from "../utils/utils";
import {arrayMethods} from "./array";
import {Dep} from "./dep";

export function observe(data) {
    if (!isObject(data)) return
    if (data.__ob__) return
    return new Observer(data)
}

class Observer {
    constructor(data) {
        Object.defineProperty(data, "__ob__", {
            value: this,
            enumerable: false
        })
        if (isArray(data)) {
            data.__proto__ = arrayMethods
            this.observeArray(data)
        }else {
            this.walk(data)
        }
    }
    walk(data) {
        Object.keys(data).forEach((key) => {
            definedReactive(data, key, data[key])
        })
    }
    observeArray(arr) {
        arr.forEach(observe)
    }
}

/**
 * 性能问题1: 对象嵌套太多会影响性能
 * @param data
 * @param key
 * @param value
 * @returns {*}
 */
function definedReactive(data, key, value) {
    let dep = new Dep()
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.depend()
            }
            return value
        },
        set(newValue) {
            if (newValue === value) return;
            if (isObject(newValue)) { observe(newValue) }
            value = newValue
            dep.notify()
        }
    })
}