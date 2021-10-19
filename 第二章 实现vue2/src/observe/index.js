import {isObject} from "../utils/utils";

export function observe(data) {
    if (!isObject(data)) return
    return new Observer(data)
}

class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        Object.keys(data).forEach((key) => {
            definedReactive(data, key, data[key])
        })
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
    observe(value)
    Object.defineProperty(data, key, {
        get() {
            return value
        },
        set(newValue) {
            if (newValue === value) return;
            console.log(newValue)
        }
    })
}