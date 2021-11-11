/**
 * node旧方法(默认使用回调来做异步)转promise做异步
 * node 所有api最后一个参数都是回调, 因此我们只需要帮它默认传一个回调执行promise就好
 */
let fs = require('fs')
function promisify(fn) {
    return function (...args) {
        return new Promise((resolve, reject) => {
            fn(...args, function (err, data) {
                if (err) reject(err)
                resolve(data)
            })
        })
    }
}
let read = promisify(fs.readFile)
read('test.md', 'utf8').then((data) => {
    console.log(data)
})

/**
 * ajax的超时原理: promise.race
 * 成功的时候就执行成功的promise, 超时的时候就执行超时的promise
 */

/**
 * 破坏promise的链式调用
 * return new Promise(() => {}); 让返回值一直处于pending状态,就会同步代码执行完就会内存回收
 */

/**
 * ★★★
 * Promise的原理是: 执行resolve/reject的时候执行队列
 * Generator的原理是: 转换成一个while+switch case函数, 然后逐个拿值
 *      - https://blog.csdn.net/hj7jay/article/details/53905868
 * co的原理是: 构建一个Generator的自动运行器(利用promise解决每一次Generator yield的异步操作)
 *      - koa、express都是基于co实现异步
 * async await的原理是: 其实就是co的语法糖(也可以叫generator的语法糖)
 */
// 构建一个Generator的自动运行器
function co(it) {
    return new Promise((resolve, reject) => {
        function next(data) {
            let { value, done } = it.next(data)
            if (done) {
                return resolve(value)
            }
            Promise.resolve(value).then(data => {
                next(data)
            })
        }
        next()
    })
}
function * read02() {
    let a = yield fs.readFile('a.txt', 'utf-8')
    let b = yield fs.readFile('b.txt', 'utf-8')
}
co(read02()).then(data => console.log(data))

/**
 * promise面试真题

 // 题目一:
 console.log(1)
 async function test() {
    console.log(2)
    await console.log(3)    // await后包装的内容是promise, 这行以下的代码理解为该Promise.resolve(console.log(3)).then(() => { // 放到内部 })
    console.log(4)
}
 setTimeout(() => {
    console.log(5)
}, 0)
 const p1 = new Promise((resolve, reject) => {
    console.log(6)
    resolve(7)  // resolve放到微任务中
})
 p1.then(res => {
    console.log(res)
})
 test()
 console.log(8)
 // [1, 6, 2, 3, 8, 7, 4, 5]


 // 题目二: (node课时12)
 Promise.resolve().then(() => {
    console.log(0)
    return Promise.resolve(4)   // 返回值是promise, 内部会调一下这个promise.then(), 然后帮你返回一个内部生成的promise,
}).then((res) => {
    console.log(res)
})

 Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
})

 // 0,1,2,3,4,5
 // ecmascript规范中, 返回promise, 他不会立即执行, 会将这个promise又放到异步方法中进行处理(生成新的一个微任务return queueMicrotask(Promise.resolve(4)))
// 总结: 返回promise就在微任务里往后两步

 *
 */


