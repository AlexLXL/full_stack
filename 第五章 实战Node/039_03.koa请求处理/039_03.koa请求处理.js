let Koa = require('koa');
let path = require('path');
let login = require('./page/login')
let bodyParser = require('./middles/bodyParser')
let static = require('./middles/static')
let Router = require('./middles/router')
// let bodyParser = require('koa-bodyparser')   // 解析body
// let static = require('koa-static')   // 静态服务, localhost:3000/xxxx.js访问文件
// let Router = require('koa-router')   // 路由

let app = new Koa();
let router = new Router()

// 使用中间件
app.use(bodyParser({dir:path.resolve(__dirname,'upload')}))
app.use(static(__dirname))
app.use(static(path.resolve(__dirname, 'middles')))
login(app)

// 使用路由（内部会执行完匹配的路由中间件再next()往下走）
router.get('/router1', async (ctx, next) => {
    console.log('router1.1')
    await next()
})
router.get('/router1', async (ctx, next) => {
    console.log('router1.2')
    await next()
})
app.use(router.routes())


app.use(async (ctx, next) => {
    ctx.body = 'all'
})
app.listen(3000, function() {
    console.log(`server start 3000 `)
})

