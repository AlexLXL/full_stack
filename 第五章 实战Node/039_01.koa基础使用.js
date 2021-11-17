/**
 * koa:
 *      - 基于promise [由express原班人马打造]
 *      - 增强req和res [生成request和response =统一组成=> ctx]
 *      - 有自己的中间件机制 []
 *      - 轻巧(利用原型链写)
 * express: 基于express
 */

/**
 * 基础使用
 */
// let Koa = require('koa')
let Koa = require('./039_02.实现koa')
/*

let app = new Koa()
app.use((ctx) => {
    ctx.body = 'hello-world'

    // 以下方式都能访问, 但一般用最后的,前两个是原生, 后两个是封装[扩展了新属性pathname/query]
    /!*console.log(ctx.req.path)
    console.log(ctx.request.req.path)
    console.log(ctx.request.path)
    console.log(ctx.path)*!/

})
app.on('error', (err) => {
    console.log(`ERROR: ${err}`)
})
app.listen('9090', () => {
    console.log(`server start 9090`)
})*/


/*
好题: async和await相关

async function f1() {
    console.log(1)
    f2()
    console.log(2)
}

async function f2() {
    console.log(3)
    await sleep(3000)
    console.log(4)
}

function sleep(time) {
   return new Promise((resolve, reject) => {
       setTimeout(() => {
           console.log(5)
           resolve()
       }, time)
   })
}

f1()
*/
/**
 * OUTPUT: 1 3 2 【等3s】 5 4
 * 理解: 都套了async也就是可以把f2理解成一个new Promise包裹, 并返回该promise
 *      但在f1调用f2的时候并没有使用await等待这个promise, 所以结果就这样了
 */