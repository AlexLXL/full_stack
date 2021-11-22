let methods = require('methods')    // 第三方模块, express依赖该模块所以可以不用下载
let http = require('http')
let url = require('url')
let Router = require('../router/index')

function Application() {
    // 如果用户单纯new express(), 但压根没listen, 没有必要创建路由系统, 因此改用lazy_route()
    // this.router = new Router()
}

methods.forEach(method => {
    Application.prototype[method] = function(path, ...handlers) {
        this.lazy_route()
        this.router[method](path, handlers)
    }
})

Application.prototype.use = function() {
    this.lazy_route()
    this.router.use(...arguments)
}

Application.prototype.listen = function(...args) {
    this.lazy_route()
    let server = http.createServer( (req, res) => {
        let {query} = url.parse(req.url, true)
        req.query = query

        function done() {
            res.end(`Not Found Router`)
        }
        this.router.handle(req, res, done)
    })
    server.listen(...args)
}
Application.prototype.all = function() {}
Application.prototype.lazy_route = function() {
    if (!this.router) {
        this.router = new Router()
    }
}

module.exports = Application