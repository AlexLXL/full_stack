/**
 * 代理模式场景:
 * 1.虚拟代理(图片预加载)
 * 2.图片懒加载
 * 3.缓存代理
 * 4.防抖节流
 * 5.正向代理和反向代理
 * 6.代理this
 * 7.proxy API
 */

/**
 * 1.虚拟代理(图片预加载)
 */
// 一开始都设置为loading图
// let img = new Image()
// img.src = "http:localhost:9000/1.jpg"    // 这里会请求图片,浏览器会缓存图片
// dom.src = "http:localhost:9000/1.jpg"    // dom获取到的是缓存图片

/**
 * 2.图片懒加载
 * 往下拖动,当图片要到显示区域的时候再去请求
 * -可以通过html的dateset来存储图片名称
 */

/**
 * 3.缓存代理
 * 就是算法可的阶乘和斐波拉契, 在递归的过程中有重复计算的问题, 可通过缓存来提高运行速度
 */

/**
 * 4.节流防抖(装饰器模式的时候说了)
 */

/**
 * 5.正向代理和反向代理
 * 【 我 -> 代理服务器 】-> chrome服务器   // 正向代理, 内网访问外网
 * 我 -> 【 Nginx -> chrome服务器 】      // 反向代理
 *
 * 知识点:
 * express要用js写
 * http可以用ts、js写
 */
// 反向代理
// · 9000代理服务器
// let httpProxy = require("http-proxy")
// let http = require("http")
// let proxy = httpProxy.createProxyServer()
// let server = http.createServer((req, res)    => {
//     proxy.web(req, res, {
//         target: "http://127.0.0.1:9001"
//     })
// })
// server.listen(9000, () => {console.log(`9000端口`)})

// · 9001真实服务器
// export {}
// let http = require("http")
// let server = http.createServer((req, res)    => {
//     res.setHeader('Content-Type','text/plain; charset=utf-8');
//     res.end("9001端口")
// })
// server.listen(9001, () => {console.log(`9001端口`)})

/**
 * 6.代理this
 * 就是添加一个函数，return 原函数fn.apply(this, arguments)或fn.bind(this)
 */

/**
 * 7.Proxy API
 * 应用在Vue3, 不在需要像Vue2那样通过Object.definedProperty来绑定,同时解决vue2的$set绑定新属性问题
 */
// let data = {
//     size: 1000,
//     arr: ["a", "b", "c"]
// }
// let proxyData = new Proxy(data, {
//     get(target: { arr: string[]; size: number }, p: PropertyKey, receiver: any): any {
//         if (p === "size") {
//             return target.size - 1
//         }else {
//             return target[p]
//         }
//     },
//     set(target: { arr: string[]; size: number }, p: PropertyKey, value: any, receiver: any): boolean {
//         if (p === "size") {
//             if (value > 1000) {
//                 throw new Error(`设置值不能大于1000`)
//                 return false
//             }else {
//                 target[p] = value
//                 return true
//             }
//         }
//         return true
//     }
// })
// console.log(proxyData.size) // 999
// proxyData.size = 777
// console.log(proxyData.size) // 776