let methods = require('methods')
let url = require('url')
let Layer = require('./layer')
let Route = require('./route')

function Router() {
    let router = function (req, res, next) {
        router.handle(req, res, next)
    }
    router.stack = []
    router.__proto__ = proto    // 好代码, 为了能复用以前的代码, 通过原型链来扩展这次变动
    return router
}

let proto = {}
methods.forEach(method => {
    proto[method] = function (path, handlers) {
        if (!Array.isArray(handlers)) {
            handlers = Array.from(arguments).slice(1)
        }
        let route = this.route(path)
        route[method](handlers)
        // this.stack.push({
        //     method: 'get',
        //     path,
        //     handler
        // })
    }
})
proto.handle = function (req, res, done) {
    // let {pathname, query} = url.parse(req.url, true)
    // let requestMethod = req.method.toLocaleLowerCase()
    // for (let i = 0; i < this.stack.length; i++) {
    //     let  {method, path, handler} = this.stack[i]
    //     if (path === pathname && method === requestMethod) {
    //         return handler(req, res)
    //     }
    // }
    // return done()

    let {pathname} = url.parse(req.url, true)
    let method = req.method.toLocaleLowerCase()
    let i = 0
    let removed = ''
    let next = (err) => {
        if (i === this.stack.length) return done()
        let layer = this.stack[i++]
        if (removed.length) {   // 二级路由补前缀
            req.url = removed + req.url
            removed = ''
        }

        if (err) {
            // 如果有错误, 中间路由不要执行，跳转到错误中间件
            if (!layer.route) {
                if (layer.handler.length === 4) {
                    layer.handler(err, req, res,  next)
                }else {
                    next(err)
                }
            }else {
                next(err)
            }
        }else {
            if (layer.matchPath(pathname)) {
                req.params = layer.params
                if (!layer.route) {
                    // 中间件匹配
                    if (layer.handler.length === 4) {   // 错误中间件, 4个参数
                        next()
                    }else {

                        // 二级路由删前缀
                        if (layer.path !== '/') {
                            removed = layer.path
                            req.url = req.url.slice(removed.length)
                        }
                        
                        layer.handler_request(req, res, next)   // 正常中间件
                    }
                }else {
                    // 路由匹配
                    if (layer.route.methods[method]) {
                        layer.handler_request(req, res, next)     // route.dispatch
                    }else {
                        next()
                    }
                }
            }else {
                next()
            }
        }
    }
    next()
}
proto.route = function (path) {
    let route = new Route()
    let layer = new Layer(path, route.dispatch.bind(route))
    layer.route = route
    this.stack.push(layer)
    return route
}
proto.use = function () {
    let args = Array.from(arguments)
    let path = '/'
    let handlers = []
    if (typeof args[0] !== 'function') {
        path = args[0]
        handlers = args.slice(1)
    }else{
        handlers = [...args]
    }
    handlers.forEach(handler => {
        let layer = new Layer(path,  handler)
        layer.route = undefined // 有layer.route就是路由,没有layer.route就是中间件
        this.stack.push(layer)
    })
}

module.exports = Router