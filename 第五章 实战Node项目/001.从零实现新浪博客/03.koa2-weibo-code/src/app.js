const path = require('path')
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const koaStatic = require('koa-static')
const {REDIS_CONF} = require('./conf/db')
const {SESSION_SECRET_KEY} = require('./conf/secretKeys')
const {isPrd, notTest} = require('./utils/env')

// 路由
const utilsAPIRouter = require('./routes/api/utils')
const userAPIRouter = require('./routes/api/user')
const userViewRouter = require('./routes/view/user')
const blogSquareAPIRouter = require('./routes/api/blog-square')
const blogProfileAPIRouter = require('./routes/api/blog-profile')
const blogHomeAPIRouter = require('./routes/api/blog-home')
const blogViewRouter = require('./routes/view/blog')
const errorViewRouter = require('./routes/view/error')

// error handler_错误页面
let onErrorConf = {}
if (isPrd) onErrorConf = {redirect: 'error'}
onerror(app, onErrorConf)

// middlewares_中间件
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
if (notTest) {
    app.use(logger())
}
app.use(koaStatic(__dirname + '/public'))
app.use(koaStatic(path.join(__dirname, '..', 'uploadFiles')))
// 注册ejs文件
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))
// session配置
app.keys = [SESSION_SECRET_KEY]
app.use(session({
    key: 'weibo.sid', //cookie的name
    prefix: 'weibo:sess:', //redis key的前缀, 默认`koa:sess:`
    cookie: {
        path: '/',
        httpOnly: true, //只能服务端修改cookie
        maxAge: 24 * 60 * 60 * 1000, //ms
    },
    // ttl: 24 * 60 * 60 * 1000,
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))

// routes_路由
app.use(utilsAPIRouter.routes(), utilsAPIRouter.allowedMethods())
app.use(userAPIRouter.routes(), userAPIRouter.allowedMethods())
app.use(userViewRouter.routes(), userViewRouter.allowedMethods())
app.use(blogSquareAPIRouter.routes(), blogSquareAPIRouter.allowedMethods())
app.use(blogProfileAPIRouter.routes(), blogProfileAPIRouter.allowedMethods())
app.use(blogHomeAPIRouter.routes(), blogHomeAPIRouter.allowedMethods())
app.use(blogViewRouter.routes(), blogViewRouter.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())

// error-handling_错误打印
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
