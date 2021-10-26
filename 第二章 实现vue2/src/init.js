import {initState} from "./state";
import {compilerToFunction} from "./compiler";
import {mountComponent} from "./lifeCycle";
import {nextTick} from "./async/nextTick";
import {mergeOptions} from "../../第九章 Test/ZF_001.impl_vue01/src/utils";

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        let vm = this
        // vm.$options = options
        // 合并:全局属性+组件属性(如Vue.mixin内的数据和方法)
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