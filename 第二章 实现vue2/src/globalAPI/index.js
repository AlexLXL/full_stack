import {isArray} from "../utils/utils";

/**
 * 将全局属性都放到对应队列里，方便初始化子组件时进行属性合并
 * @param Vue
 */
export function initGlobalAPI(Vue) {
    Vue.options = {}
    Vue.mixin = function (options) {
        this.options = mergeOptions(this.options, options)
    }
    Vue.component = function () {}
    Vue.filter = function () {}
    Vue.directive = function () {}
}

/**
 * 类似Object.assign,将全局属性组合起来
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
 * 生命周期函数(使用队列存储)
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