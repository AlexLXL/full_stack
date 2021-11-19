function Layer(path, handler) {
    this.path = path
    this.handler = handler
}
Layer.prototype.matchPath = function (pathname) {
    return this.path === pathname
}
Layer.prototype.matchMethod = function (method) {
    return this.method === method
}
Layer.prototype.handler_request = function (req, res, next) {
    this.handler(req, res, next)
}

module.exports = Layer