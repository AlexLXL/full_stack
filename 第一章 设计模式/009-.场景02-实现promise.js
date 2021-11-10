(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global.Promise = factory());
}(this, (function () {
    'use strict';

    function Promise(excute) {
        this.status = "pending"
        this.data = ""
        this.callbacks = [] // 成功失败回调

        try {
            excute(resolve, reject) // 高阶函数
        }catch(err) {
            // --snip--
        }
        function resolve(value) {
            this.status = "fulfilled"
            this.data = value

            this.callbacks.forEach((callback) => {
                callback.onfulfilled(value)
            })
        }
        function reject() {
            this.status = "rejected"
            this.data = value

            this.callbacks.forEach((callback) => {
                callback.onrejected((value))
            })
        }
    }

    Promise.prototype.then = function (onfulfilled, onrejected) {
        let status = this.status
        let promise

        typeof onfulfilled === "function" ? onfulfilled : (value) => { return value }
        typeof onrejected === "function" ? onrejected : (value) => { throw new Error(value) }

        if (status === "pending") {
            // --wait--
            // 一会存一下callbacks
            // this.callbacks.push({
            //     onfulfilled: onfulfilled,
            //     onrejected: onrejected
            // })
            // onfulfilled、onrejected有可能没有返回promise，还是要处理一下
            promise = new Promise((resolve, reject) => {
                this.callbacks.push({
                    onfulfilled: function () {
                        handlePromiseStatus(resolve, rejects, onfulfilled, this.data)
                    },
                    onrejected: function () {
                        handlePromiseStatus(resolve, rejects, onrejected, this.data)
                    }
                })
            })
        }else if (status === "fulfillled") {
            promise =  new Promise((resolve, reject) => {
                // 模拟异步
                setTimeout(() => {
                    handlePromiseStatus(resolve, rejects, onfulfilled, this.data)
                }, 0)
            })
        }else if(status === "rejected"){
            promise =  new Promise((resolve, reject) => {
                setTimeout(() => {
                    handlePromiseStatus(resolve, rejects, onrejected, data)
                }, 0)
            })
        }
        return promise

    }
    Promise.prototype.catch = function (onrejected) {
        this.then(null, onrejected)
    }
    function handlePromiseStatus(resolve, rejcet, fn, value) {
        try {
            let res = fn(value)
            if (res instanceof Promise) {
                res.then(resolve, reject)   // 当子promise成功的时候,父的这个promise也要设置为成功
            }else {
                resolve(res)
            }
        }catch (err) {
            // onfulfilled里面throw的话要捕获
            reject(err)
        }
    }

    Promise.then = function (value) {
        if (value instanceof Promise) return value
        return new Promise((resolve, reject) => { resolve(value) })
    }
    Promise.catch = function (reason) {
        return new Promise((resolve, reject) => { reject(reason) })
    }
    Promise.all = function (promises) {
        let len = promises.length
        let count = 0
        let reuslt = Array(len)

        return new Promise((resolve, rejeact) => {
            promises.forEach((item, index) => {
                item.then(
                    (value) => {
                        result[index] = value
                        count++
                        if (count === len) {
                            resolve(result)
                        }
                    },
                    (reason) => {
                        rejects(reson)
                    }
                )
            })
        })
    }

    return Promise
})));