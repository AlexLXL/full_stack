export function isFunction(val) {
    return typeof val === "function";
}

export function isObject(val) {
    return typeof val === "object" && val !== null;
}

export function isArray(val) {
    return Array.isArray(val);
}

let callbacks = [];
let waiting = false;
export function nextTick(fn) {
    callbacks.push(fn);
    if (!waiting) {
        Promise.resolve().then(flushCallbacks);
        waiting = true;
    }
}
function flushCallbacks() {
    callbacks.forEach(fn => fn());
    callbacks = [];
    waiting = false;
}

// 第一次合并： {} {beforeCreate: fn} => {beforeCreate: [fn]}
// 第二次合并:  {beforeCreate: [fn]} {beforeCreate: fn} => {beforeCreate: [fn, fn]}
let strategys = {}; // 存储所有策略
let lifeCycle = ["beforeCreate", "created", "beforeMount", "Mounted"];
lifeCycle.forEach(hook => {
    strategys[hook] = function(parentVal, childVal) {
        if(childVal) {
            if(parentVal) {
                return parentVal.concat(childVal); // 看上面的第二次合并，parentVal已经是数组
            }else {
                if(isArray(childVal)) {
                    return childVal
                }
                return [childVal];
            }
        }else {
            return parentVal;
        }
    }
})


export function mergeOptions(parentVal, childVal) {
    const options = {};
    // 合并全局属性和组件属性(options)
    for(let key in parentVal) {
        mergeFiled(key);
    }

    // 添加组件属性
    for(let key in childVal) {
        if(!parentVal.hasOwnProperty(key)) {
            mergeFiled(key);
        }
    }

    function mergeFiled(key) {
        let strat = strategys[key];
        if(strat) {
            options[key] = strat(parentVal[key], childVal[key]); // 合并生命周期
        }else {
            options[key] = childVal[key] || parentVal[key]; // 合并data那些
        }
    }

    return options;
}