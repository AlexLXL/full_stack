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
    data = isFunction(data) ? data() : data
    observe(data)
}