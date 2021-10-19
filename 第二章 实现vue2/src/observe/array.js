let oldArrayPrototype = Array.prototype
export let arrayMethods = new Object(oldArrayPrototype)
let methods = ["push", "pop", "unshift", "shift", "reverse", "sort", "splice",]
methods.forEach((method) => {
    arrayMethods[method] = function () {
        // FIXME: 重写数组方法
        console.log(`数组方法已经重写`)
    }
})