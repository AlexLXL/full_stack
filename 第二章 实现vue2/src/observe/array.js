let oldArrayPrototype = Array.prototype
export let arrayMethods = Object.create(oldArrayPrototype)
let methods = ["push", "pop", "unshift", "shift", "reverse", "sort", "splice",]
methods.forEach((method) => {
    arrayMethods[method] = function (...args) {
        oldArrayPrototype[method].apply(this, args)
        // 对增加的元素进行监听
        let addElement = null
        switch (method) {
            case "splice":
                addElement = args.slice(2)
                break;
            case "push":
            case "unshift":
                addElement = args
                break;
        }
        addElement && this.__ob__.observeArray(addElement)
        this.__ob__.dep.notify()
    }
})