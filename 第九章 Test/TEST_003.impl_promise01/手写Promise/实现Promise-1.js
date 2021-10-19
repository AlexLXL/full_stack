/**
 * 下面三行都是为了把factory暴露出去
 *  // 判断是否是commonjs的模块化规范
 *  // 判断是否是AMD规范，用于浏览器环境
 *  // 如果不是上面两种规范，就把factory()返回值放到window属性上(global.Promise)
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
      (global.Promise = factory());
}(this, (function () {
  'use strict';

  function Promise(executor) {     // 创建实例对象的构造函数，同步的
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
    function resolve(value) {      // 这里接收的value，.then会用到
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
  
  Promise.prototype.then = function (onfulfilled, onrejected) {
    // 用数组存一下，放在resolve和reason里面调用
    // 成功的onfulfilled放在上面resolve方法里；失败的onrejected放在上米娜reject方法里；所以调用resolve(11)就运行onfulfilled...
    this.callbacks.push({
      onfulfilled: onfulfilled,
      onrejected: onrejected
    });
  };

  Promise.prototype.catch = function (onrejected) {
    this.callbacks.push({
      onrejected: onrejected
    });
  };


  Promise.resolve = function () {};

  Promise.reject = function () {};

  Promise.all = function () {};

  return Promise;
})));