import {patch} from "./vdom/patch";

export function mountComponent(vm) {
    let vNode = vm._render()
    vm._update(vNode)
}

export function lifCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
    }
}