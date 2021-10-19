import {isFunction} from "./utils/utils";
import {observe} from "./observe";

export function initState(vm) {
    const opts = vm.$options

    if (opts.data) {
        initData(vm)
    }
}

function initData(vm) {
    let data = vm.$options.data
    data = vm._data = isFunction(data) ? data() : data
    observe(data)

    for (let key in data) {
        proxy(vm, key, "_data")
    }
}

/**
 * 易混淆: 这里是将“options的data”代理到实例 和 new Vue(options)的options没任何关联, options的任何属性都不会挂载到实例
 * @param vm
 * @param key
 * @param source
 * @returns {*}
 */
function proxy(vm, key, source) {
    Object.defineProperty(vm, key, {
        get() {
            return vm[source][key]
        },
        set(v) {
            vm[source][key] = v
        }
    })
}