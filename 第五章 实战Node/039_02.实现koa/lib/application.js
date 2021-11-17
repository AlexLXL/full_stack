let EventEmitter = require('events')
let http = require('http')
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
    }

    use(fn) {
        this.fn = fn
    }

    handleRequest = (req, res) => {
        let ctx = this.createContext(req, res)
        this.fn(ctx)
        if (typeof ctx.body === 'object') {
            res.setHeader('Content-Type', `application/json;charset=utf8`)
            res.end(JSON.stringify(ctx.body))
        }else if (ctx.body) {
            res.end(ctx.body)
        }else {
            res.end('Not Found')
        }
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

    listen(...args) {
        let server = http.createServer(this.handleRequest)
        server.listen(...args)
    }
}

module.exports = Koa