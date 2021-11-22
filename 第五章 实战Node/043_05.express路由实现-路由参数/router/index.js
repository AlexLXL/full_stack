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
    router.events = {};
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
                        this.handle_params(req, res, layer, () => { // 如果处理完成真正的进行响应
                            layer.handler_request(req, res, next)
                        })
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

proto.handle_params = function(req, res, layer, out) {
    let keys = layer.keys;
    if (!keys || !keys.length) return out();
    keys = keys.reduce((memo, current) => [...memo, current.name], []);
    let events = this.events;
    let i = 0;
    let index = 0;
    let key;
    let fns;
    const next = () => {
        if (keys.length === i) return out()
        key = keys[i++]
        fns = events[key];
        if (fns) {
            processCallback();
        } else {
            next();
        }
    }
    next();
    function processCallback() {
        let fn = fns[index++];
        if (fn) {
            fn(req, res, processCallback, layer.params[key], key)
        } else {
            index = 0;
            next();
        }
    }
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

proto.param = function(key, callback) { // {id:[],name:[]}
    if (this.events[key]) {
        this.events[key].push(callback);
    } else {
        this.events[key] = [callback]
    }
}

module.exports = Router