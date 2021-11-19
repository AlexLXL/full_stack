let url = require('url')

function Router() {
    this.stack = []
}
Router.prototype.get = function (path, handler) {
    this.stack.push({
        method: 'get',
        path,
        handler
    })
}
Router.prototype.handle = function (req, res, done) {
    let {pathname, query} = url.parse(req.url, true)
    let requestMethod = req.method.toLocaleLowerCase()
    for (let i = 0; i < this.stack.length; i++) {
        let  {method, path, handler} = this.stack[i]
        if (path === pathname && method === requestMethod) {
            return handler(req, res)
        }
    }
    return done()
}