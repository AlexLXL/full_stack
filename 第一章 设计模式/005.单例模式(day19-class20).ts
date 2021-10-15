/**
 * ES6-class 实现单例
 */
class Window01 {
    private static instance: Window01
    private constructor() {}
    public static getInstance() {
        if (!Window01.instance) {
            Window01.instance = new Window01()
        }
        return Window01.instance
    }
}
// let w1 = Window01.getInstance()
// let w2 = Window01.getInstance()
// console.log(w1 === w2)  // OUTPUT: true


/**
 * ES5-function 实现单例
 * 缺点: 要告诉用户需使用getInstance实例化
 */
interface Window02 {}
function Window02() {}
Window02.getInstance = (function () {
    let instance: Window02;
    return function () {
        if (!instance) {
            instance = new (Window02 as any)()
        }
        return instance
    }
})()
// let w1 = Window02.getInstance()
// let w2 = Window02.getInstance()
// console.log(w1 === w2)  // OUTPUT: true

/**
 * ES5-function 透明单例
 * 偷偷给用户做单例,用户无感知
 */
interface Window03 {}
let Window03 = (function () {
    let instance: Window03
    // ts函数默认第一个值可声明this
    return function (this: Window03) {
        if (!instance) {
            instance = this
        }
        return instance
    }
})()
// let w1 = new (Window03 as any)()
// let w2 = new (Window03 as any)()
// console.log(w1 === w2)  // OUTPUT: true

/**
 * 单例与构建过程分离
 */
class Window04 {}
let createInstance = function (Constructor: any) {
    let instance: any
    return function (this: any) {
        if (!instance) {
            instance = new Constructor()
        }
        return instance
    }
}
let createWindow04 = createInstance(Window04)
let w1 = createWindow04()
let w2 = createWindow04()
console.log(w1 === w2)  // OUTPUT: true