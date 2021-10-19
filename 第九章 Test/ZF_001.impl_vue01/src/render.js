import {isObject} from "./utils";
import {createElement, createText} from "./vdom";

export function renderMixin(Vue) {
    Vue.prototype._render = function() {
        const vm = this;
        let {render} = vm.$options;
        let vnode = render.call(vm);
        return vnode;
    }
    Vue.prototype._c = function() {
        const vm = this;
        return createElement(vm, ...arguments);
    }
    Vue.prototype._v = function(text) { // 创建文本的虚拟节点
        const vm = this;
        return createText(vm, text);
    }
    Vue.prototype._s = function(val) {
        if(isObject(val)) return JSON.stringify(val);
        return val;
    }
}