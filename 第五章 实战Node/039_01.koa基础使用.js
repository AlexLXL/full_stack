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

let app = new Koa()
app.use((ctx) => {
    ctx.body = 'hello-world'

    // 以下方式都能访问, 但一般用最后的,前两个是原生, 后两个是封装[扩展了新属性pathname/query]
    /*console.log(ctx.req.path)
    console.log(ctx.request.req.path)
    console.log(ctx.request.path)
    console.log(ctx.path)*/

})
app.on('error', (err) => {
    console.log(`ERROR: ${err}`)
})
app.listen('9090', () => {
    console.log(`server start 9090`)
})