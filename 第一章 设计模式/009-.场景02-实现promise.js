/**
 * promise的resolve和reject可以作为同步代码执行,为什么将resolve,reject引入到微任务?
 * 答: 不去半路阻塞脚本, 实现延迟绑定
 */

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
        let self = this

        try {
            excute(resolve, reject) // 高阶函数
        }catch(err) {
            // --snip--
        }
        function resolve(value) {
            self.status = "fulfilled"
            self.data = value

            self.callbacks.forEach((callback) => {
                callback.onfulfilled(value)
            })
        }
        function reject() {
            self.status = "rejected"
            self.data = value

            self.callbacks.forEach((callback) => {
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
                        handlePromiseStatus(resolve, reject, onfulfilled, this.data)
                    },
                    onrejected: function () {
                        handlePromiseStatus(resolve, reject, onrejected, this.data)
                    }
                })
            })
        }else if (status === "fulfilled") {
            promise =  new Promise((resolve, reject) => {
                handlePromiseStatus(resolve, reject, onfulfilled, this.data)
            })
        }else if(status === "rejected"){
            promise =  new Promise((resolve, reject) => {
                handlePromiseStatus(resolve, reject, onrejected, data)
            })
        }
        return promise

    }
    Promise.prototype.catch = function (onrejected) {
        this.then(null, onrejected)
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

        return new Promise((resolve, reject) => {
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
                        reject(reson)
                    }
                )
            })
        })
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

    return Promise
})));