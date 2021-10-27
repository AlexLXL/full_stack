import {isArray, isObject} from "../utils/utils";

/**
 * 全局属性都存到Vue.options
 * 1.全局生命周期-保存到队列中，然后放到Vue.options.mounted = [fn, fn]
 * 2.全局组件-保存到队列中，然后放到Vue.options.components = {Sub, Sub}
 * @param Vue
 */
export function initGlobalAPI(Vue) {
    Vue.options = {}
    Vue.mixin = function (options) {
        this.options = mergeOptions(this.options, options)
    }

    Vue.options.components = {}
    Vue.component = function (id, definition) { // FIXME: definition为函数情况未处理
        let name = definition.name || id
        definition.name = name
        if (isObject(definition)) {
            definition = Vue.extend(definition)
            // 内部自动调用Vue.extent(返回Vue的子类)
        }
        Vue.options.components[name] = definition
    }
    /**
     * 创建一个函数作为Vue的子类(通过修改原型链)
     * 内部存储了options和mixin属性
     * @param opt
     * @returns {Sub} 其实就是一个构造函数
     */
    Vue.extend = function(opt) {
        const Super = this
        const Sub = function (options) {
            this._init(options)
        }
        Sub.prototype = Object.create(Super.prototype)  // 继承
        Sub.prototype.constructor = Sub
        Sub.options = mergeOptions(Super.options, opt)
        Sub.mixin = Vue.mixin
        return Sub
    }

    Vue.filter = function () {}
    Vue.directive = function () {}
    Vue.options._base = Vue
}
/*
Object.create原理
Object.create = function (parentPrototype) {
    const Fn = function () {}
    Fn.prototype = parentPrototype
    return Fn
}
*/

/**
 * 将全局属性组合起来(类似Object.assign)
 * ● 生命周期、Component
 * @param parentVal
 * @param childVal
 * @returns {{}}
 */
export function mergeOptions(parentVal, childVal) {
    const options = {};
    for(let key in parentVal) {
        mergeFiled(key);
    }
    for(let key in childVal) {
        if(!parentVal.hasOwnProperty(key)) {
            mergeFiled(key);
        }
    }
    function mergeFiled(key) {
        let strategy = strategys[key];
        if(strategy) {
            options[key] = strategy(parentVal[key], childVal[key]);
        }else {
            options[key] = childVal[key] || parentVal[key];
        }
    }

    return options;
}

/**
 * 生命周期合并策略
 * @type {{}}
 */
let strategys = {};
let lifeCycle = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted"
];
lifeCycle.forEach(hook => {
    strategys[hook] = function(parentVal, childVal) {
        if(childVal) {
            if(parentVal) {
                return parentVal.concat(childVal);
            }else {
                if(isArray(childVal)) {
                    return childVal
                }
                return isArray(childVal) ? childVal : [childVal];
            }
        }else {
            return parentVal;
        }
    }
})

/**
 * 暴露声明周期函数
 * @param vm
 * @param hook
 */
export function callHook(vm, hook) {
    let handlers = vm.$options[hook];
    handlers && handlers.forEach(item => {
        item.call(this); // 声明周期的this永远指向实例
    })
}

/**
 * 组件合并策略
 */
strategys.components = function (parentVal, childVal) {
    // childVal.__proto__ = parentVal
    let res = Object.create(parentVal)
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key]
        }
    }
    return res
}