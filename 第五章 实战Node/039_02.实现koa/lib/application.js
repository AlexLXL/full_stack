let EventEmitter = require('events')
let http = require('http')
let Stream = require('stream')
let context = require('./context')
let request = require('./request')
let response = require('./response')

class Koa extends EventEmitter {
    constructor() {
        super();
        // 好代码: 使用原型链隔离上下文 [context放到原型链上共享, 然后有自己的context]
        // 等效于this.content.__proto__ = context
        this.context = Object.create(context)
        this.request = Object.create(request)
        this.response = Object.create(response)
        this.middlewares = []
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    handleRequest = (req, res) => {
        let ctx = this.createContext(req, res)
        this.compose(ctx).then(() => {
            if (ctx.body instanceof Stream) {
                ctx.body.pipe(res)
            }else if (typeof ctx.body === 'object') {
                res.setHeader('Content-Type', `application/json;charset=utf8`)
                res.end(JSON.stringify(ctx.body))
            }else if (ctx.body) {
                res.end(ctx.body)
            }else {
                res.end('Not Found')
            }
        }).catch(err => {
            this.emit('error', err)
        })
    }

    createContext(req, res) {
        let ctx = Object.create(this.context)
        let request = Object.create(this.request)
        let response = Object.create(this.response)

        ctx.request = request
        ctx.req = ctx.request.req = req
        ctx.response = response
        ctx.res = ctx.response.res = res

        return ctx
    }

    /**
     * 逐个中间件执行(也就是co那样包一个promise)
     * @param ctx
     */
    compose(ctx) {
        let index = -1
        let dispatch = (i) => {
            if (i < index) return Promise.reject(`next() called multiple times`)
            index = i
            if (this.middlewares.length === i) return Promise.resolve()
            return Promise.resolve(this.middlewares[i](ctx, () => dispatch((i + 1))))
        }
        return dispatch(0)
    }

    listen(...args) {
        let server = http.createServer(this.handleRequest)
        server.listen(...args)
    }
}

module.exports = Koa