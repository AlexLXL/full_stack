/**
 * 观察者模式:
 * ● observer: 观察者, 一般有一个接口(notify)更新所有sub
 * ● subject: 被观察者, 一般有一个接口(update)更新自己
 * 一般observer会有一个数组存sub, sub有时候也会存自己的observer,两者直接通信属于松耦合的设计模式
 */

/**
 * 场景:
 * 1.dom事件绑定
 * 2.Promise
 * 3.emit和on(事件总线、node的events模块) | 读取文件的on和http的on绑定事件
 * 4.生命周期也算(mixin会将相同生命周期合并)
 * 5.vue的响应式(重要★)
 * 6.redux原理
 */

/**
 * 1.dom事件绑定
 * 把绑定的同一个事件函数放到一起(一个数组内)
 */
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
// <title>Title</title>
// </head>
// <body>
// <div id="app">点击我</div>
//     </body>
//     <script>
//     /**
//      * 1.dom事件绑定
//      * 把绑定的同一个事件函数放到一起(一个数组内)
//      */
//     let appDom = document.querySelector("#app")
// appDom.addEventListener("click", () => { console.log(1) })
// appDom.addEventListener("click", () => { console.log(2) })
// </script>
// </html>

/**
 * 2.Promise
 * promise的.then方法就是把成功和失败回调放到数组,然后循环换调用
 */

/**
 * 3.emit和on(事件总线、node的events模块) | 读取文件的on和http的on绑定事件
 * 都是一样把函数放到一个数组,然后循环调用
 */
// node的events
// let EventEmmiter = require("events")
// let subject = new EventEmmiter()
// subject.on("click", (name, age) => {
//     console.log(1, name, age)
// })
// subject.on("click", (name, age) => {
//     console.log(2, name, age)
// })
// subject.emit("click", "alex", 18)

// fs
// let fs = require("fs")
// let rs = fs.createReadStream("./100.test.txt", { highWaterMark: 3 })
// rs.on("data", (data) => {
//     console.log(data.toString())
// })
// rs.on("end", () => {
//     console.log("end")
// })

/**
 * 4.生命周期也算(mixin会将相同生命周期合并)
 * 5.vue的响应式(重要★)
 * 6.redux原理
 * 略过
 */