import {patch} from "./vdom/patch";
import {Watcher} from "./observe/watcher";

export function mountComponent(vm) {
    let updateCpmponent = function () {
        let vNode = vm._render()
        vm._update(vNode)
    }

    new Watcher(vm, updateCpmponent, () => {
        // FIXME: 依赖收集完成并进行了初次渲染
    })
}

export function lifCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
    }
}