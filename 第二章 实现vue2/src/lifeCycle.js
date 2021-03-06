import {patch} from "./vdom/patch";
import {Watcher} from "./observe/watcher";
import {callHook} from "./globalAPI";

export function mountComponent(vm) {
    let updateCpmponent = function () {
        let vNode = vm._render()
        vm._update(vNode)
    }

    callHook(vm, 'beforeCreate')
    new Watcher(vm, updateCpmponent, () => {
        // TODO: 添加生命周期
    })
    callHook(vm, 'mounted')
}

export function lifCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        let prevVnode = vm._prevVode
        vm._prevVode = vnode
        if (!prevVnode) {
            vm.$el = patch(vm.$el, vnode);
        }else {
            vm.$el = patch(prevVnode, vnode);
        }
    }
}