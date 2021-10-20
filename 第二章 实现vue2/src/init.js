import {initState} from "./state";
import {compilerToFunction} from "./compiler";
import {mountComponent} from "./lifeCycle";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        let vm = this
        vm.$options = options

        initState(vm)

        if (vm.$options.el) {
            vm.$mount(vm.$options.el)
        }
    }

    Vue.prototype.$mount = function (el) {
        let vm = this
        vm.$el = document.querySelector(el)

        let opts = vm.$options
        if (!opts.render) {
            let html = opts.template || vm.$el.outerHTML
            opts.render = compilerToFunction(html)
        }

        mountComponent(vm)
    }
}