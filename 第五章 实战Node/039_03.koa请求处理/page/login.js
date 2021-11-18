let path = require('path')
let fs = require('fs')

module.exports = function (app) {
    app.use(async (ctx, next) => {
        if (ctx.path === '/form' && ctx.method == 'GET') {
            ctx.set('Content-Type', 'text/html')
            ctx.body = fs.createReadStream(path.resolve(__dirname, '../039_03.koa请求处理.html'))
        }else {
            await next()
        }
    })

    app.use(async (ctx, next) => {
        if (ctx.path === '/login' && ctx.method == 'POST') {
            ctx.body = ctx.request.body
        }else {
            await next()
        }
    })
}