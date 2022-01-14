const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {REDIS_CONF} = require('./conf/db')

const index = require('./routes/index')
const users = require('./routes/users')

// error handler_错误页面
onerror(app)

// middlewares_中间件
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
// 注册ejs文件
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))
// session配置
app.keys = ['UIsda_8967#$']
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

// // logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes_路由
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling_错误打印
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
})

module.exports = app
