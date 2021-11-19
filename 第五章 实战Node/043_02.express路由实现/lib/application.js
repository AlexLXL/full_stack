let http = require('http')
let url = require('url')

function Application() {
    this._routers = [
        {
            method: 'all',
            path: '*',
            handler(req, res) {
                res.end('Not Found Router')
            }
        }
    ]
}
Application.prototype.get = function(path, handler) {
    this._routers.push({
        method: 'get',
        path,
        handler
    })
}
Application.prototype.listen = function(...args) {
    let server = http.createServer(function (req, res) {
        let {pathname, query} = url.parse(req.url, true)
        let requestMethod = req.method.toLocaleLowerCase()
        for (let i = 0; i < this._routers.length; i++) {
            let  {method, path, handler} = this._routers[i]
            if (path === pathname && method === requestMethod) {
                return handler(req, res)
            }
        }
        return this._routers[0].handler(req, res)
    })
    server.listen(...args)
}
Application.prototype.all = function() {}

module.exports = Application