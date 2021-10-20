import {createVnodeEle, createVnodeText} from "./vdom";
import {isObject} from "./utils/utils";

export function renderMixin(Vue) {
    /**
     * render => vnode
     */
    Vue.prototype._render = function () {
        let vm = this
        let {render} = vm.$options
        let vnode = render.call(vm)
        return vnode
    }
    Vue.prototype._c = function () {
        let vm = this
        return createVnodeEle(vm, ...arguments)
    }
    Vue.prototype._v = function (text) {
        let vm = this
        return createVnodeText(vm, text)
    }
    Vue.prototype._s = function (data) {
        if (isObject(data)) return JSON.stringify(data)
        return data
    }
}