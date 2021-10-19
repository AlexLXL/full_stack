/**
 * 下面三行都是为了把factory暴露出去
 *  // 判断是否是commonjs的模块化规范
 *  // 判断是否是AMD规范，用于浏览器环境
 *  // 如果不是上面两种规范，就把factory()返回值放到window属性上
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.Promise = factory());
}(this, (function () {
  'use strict';

  function Promise(executor) {     // 创建实例对象的构造函数，同步的, 创建过程产生新的data、resolve和reject方法、
    this.status = 'pending';       // 初始化状态
    this.data = undefined;        // 初始化数据
    this.callbacks = [];           // 存then和catch的回调
    const _self = this;            // 缓存this

    try{
      executor(resolve,reject);     // 构造函数立即调用
    }catch (e) {
      reject(e)
    }

    // 成功状态的执行函数
    function resolve(value) {        // 这里接收的value，.then会用到
      if(_self.status === 'pending') {
        _self.status = 'fulfilled';
        _self.data = value;

        // 异步执行.then的成功状态（等.then执行完）
        setTimeout(() => {
          _self.callbacks.forEach((item) => {
            item.onfulfilled(value)
          })
        },0)
      }
    }

    // 失败状态的执行函数
    function reject(reason) {
      if(_self.status === 'pending') {
        _self.status = 'rejected';
        _self.data = reason;

        // 异步执行.catch的失败状态
        setTimeout(() => {
          _self.callbacks.forEach((item) => {
            item.onrejected(reason)
          })
        },0)
      }
    }
  }

  // 根据前一个promise三种状态 返回 新promise
  Promise.prototype.then = function (onfulfilled, onrejected) {
   /*
   // 用数组存，放在上面resolve和reason方法调用
   // 成功的onfulfilled放在了resolve里面；所以运行resolve就运行onfulfilled
   this.callbacks.push({
      onfulfilled: onfulfilled,
      onrejected: onrejected
    });
    */

   const status = this.status;
   const _self = this;
   // 创建promise(then返回的)
   let promise;

   // 定义promise状态(then返回的)
   if(status === 'pending') { // 这是第一个或前一个promise的状态
     promise = new Promise(function (resolve, reject) { // 把.then的两个回调函数丢进this.callbacks，定时器到了有了状态会自动调用resolve/reject
       _self.callbacks.push({
         onfulfilled: function (value) {
           /*try {
             const result = onfulfilled(value);
             if (result instanceof Promise) {
               result.then(resolve, reject)
             } else {
               resolve(result)
             }
           } catch (e) {
             reject(e)
           }*/
           handlePromiseStatus(resolve, reject, onfulfilled, value)
         },
         onrejected: function (reason) {
           /*try {
             const result = onrejected(reason);
             if (result instanceof Promise) {
               result.then(resolve, reject)
             } else {
               resolve(result)
             }
           } catch (e) {
             reject(e)
           }*/
           handlePromiseStatus(resolve, reject, onrejected, reason)
         }
       })
     })

   }else if(status === 'fulfilled') {
     promise = new Promise((resolve, reject) => {

       // 定义promise状态：根据要返回的三种情况(return 22、throw 22、return new Promise())，（try{}catch{}捕获throw 22）
       setTimeout(function () {
         /*try {
           const result = onfulfilled(_self.data);  // 运行onfulfilled(异步，因为在.then里)

           if(result instanceof Promise) {          // 是promise
             result.then(resolve, reject)
           }else {                                   // 不是promise
             resolve(result);
           }
         }catch (e) {
           reject(e)
         }*/
         handlePromiseStatus(resolve, reject, onfulfilled, _self.data)
       },0)

     })

   }else {
     promise = new Promise((resolve, reject) => {
       setTimeout(function () {
         /*try {
           const result = onrejected(_self.data);
           if(result instanceof Promise){
             result.then(resolve, reject)
           }else {
             resolve(result)
           }
         }catch (e) {
            reject(e)
         }*/
         handlePromiseStatus(resolve, reject, onrejected, _self.data)
       })
     })

   }

   // 返回promise(then返回的)
   return promise
  };

  function handlePromiseStatus(resolve, reject, onFn, data) {
    try {
      const result = onFn(data);
      if(result instanceof Promise){
        result.then(resolve, reject)
      }else {
        resolve(result)
      }
    }catch (e) {
      reject(e)
    }
  }

  Promise.prototype.catch = function (onrejected) {
    this.callbacks.push({
      onrejected: onrejected
    });
  };

  Promise.resolve = function () {

  };

  Promise.reject = function () {

  };

  Promise.all = function () {

  };

  return Promise;
})));