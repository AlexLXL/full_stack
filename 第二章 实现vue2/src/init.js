import {initState} from "./state";
import {compilerToFunction} from "./compiler";
import {mountComponent} from "./lifeCycle";
import {nextTick} from "./async/nextTick";
import {mergeOptions} from "./globalAPI";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        let vm = this
        // vm.$options = options
        // 合并:全局属性+组件属性
        vm.$options = mergeOptions(vm.constructor.options, options);

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

    Vue.prototype.$nextTick = nextTick
}