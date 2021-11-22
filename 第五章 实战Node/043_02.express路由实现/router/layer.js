function Layer(path, handler) {
    this.path = path
    this.handler = handler
}
Layer.prototype.matchPath = function (pathname) {
    // 路由匹配
    if (this.path === pathname) {
        return true
    }

    // 中间件匹配开头
    if (!this.route) {
        if (this.path === '/') {
            return true
        }
        return pathname.startsWith(this.path + '/')
    }

    return false
}
Layer.prototype.matchMethod = function (method) {
    return this.method === method
}
Layer.prototype.handler_request = function (req, res, next) {
    this.handler(req, res, next)
}

module.exports = Layer