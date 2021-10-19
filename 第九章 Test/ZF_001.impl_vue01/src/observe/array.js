let oldArrayPrototype = Array.prototype;

export let arrayMethods = Object.create(oldArrayPrototype);

let methods = ["push", "shift", "pop", "unshift", "reverse", "sort", "splice"];

methods.forEach((method) => {
    arrayMethods[method] = function(...args){
        oldArrayPrototype[method].call(this, ...args);

        // 监控新增的值
        let inserted = null;
        let ob = this.__ob__;
        switch (method) {
            case "splice":
                inserted = args.slice(2);
            case "push":
            case "unshift":
                inserted = args;
                break;
        }
        if (inserted) ob.observeArray(inserted);
        ob.dep.notify(); // 响应式原理之收集依赖之更新流程
    }
})