import {patch} from "./vdom/patch";
import {Watcher} from "./observe/watcher";

export function mountComponent(vm) {
    // let vnode = vm._render();
    // console.log("vnode:", vnode);
    // vm._update(vnode);

    // 组件更新函数
    let updateComponent = () => {
        vm._update(vm._render()); // render -> vnode -> real DOM
    }

    callHook(vm, "beforeCreate");
    new Watcher(vm, updateComponent, () => { // render -> getter -> watcher
        callHook(vm, "created");
    }, true);

    callHook(vm, "mounted");
}

export function lifCycleMixin(Vue) {
    Vue.prototype._update = function (vnode) {
        const vm = this;
        vm.$el = patch(vm.$el, vnode);
    }
}

export function callHook(vm, hook) {
    let handlers = vm.$options[hook];
    handlers && handlers.forEach(item => {
        item.call(this); // 声明周期的this永远指向实例
    })
}