/**
 * promise怎么把回调放到微任务中?
 * 答: 在resolve函数里通过MutationObserver来微任务执行回调队列（而不是在.then的时候将回调丢进微任务）
 * 这就符合vue的原理了, 让同步代码走完, 然后再执行微任务队列
 * 同时也符合"延迟绑定的原理"
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

            // FIXME: 这里应该是通过微任务实现MutationObserver, 然后.then就不需要判断状态, 直接加到执行队列就好
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

        typeof onfulfilled === "function" ? onfulfilled : (value) => { return value }
        typeof onrejected === "function" ? onrejected : (value) => { throw new Error(value) }

        let promise = new Promise((resolve, reject) => {
            if (status === "pending") {
                this.callbacks.push({
                    onfulfilled: function () {
                        handlePromiseStatus(resolve, reject, onfulfilled, this.data)
                    },
                    onrejected: function () {
                        handlePromiseStatus(resolve, reject, onrejected, this.data)
                    }
                })
                // --wait--
                // 一会存一下callbacks
                // this.callbacks.push({
                //     onfulfilled: onfulfilled,
                //     onrejected: onrejected
                // })
                // onfulfilled、onrejected有可能没有返回promise，还是要处理一下
            } else if (status === "fulfilled") {
                handlePromiseStatus(resolve, reject, onfulfilled, this.data)
            } else if (status === "rejected") {
                handlePromiseStatus(resolve, reject, onrejected, data)
            }
        })
        return promise

    }
    Promise.prototype.catch = function (onrejected) {
        this.then(null, onrejected)
    }
    Promise.resolve = function (value) {
        if (value instanceof Promise) return value
        return new Promise((resolve, reject) => { resolve(value) })
    }
    Promise.reject = function (reason) {
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