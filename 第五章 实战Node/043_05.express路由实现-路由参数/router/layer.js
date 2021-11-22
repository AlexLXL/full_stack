let pathToRegExp = require('path-to-regexp')    // 第三方模块, 也是express依赖的

function Layer(path, handler) {
    this.path = path
    this.regexp = pathToRegExp(this.path, (this.keys = []))
    this.handler = handler
}
Layer.prototype.matchPath = function (pathname) {
    let matches = pathname.match(this.regexp)
    if (matches) {
        this.params = this.keys.reduce((total, value, index) => {
            total[value.name] = matches[index + 1]
            return total
        }, {})
        return true
    }

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