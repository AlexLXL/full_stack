let url = require('url')

let request = {
    get url() {
        return this.req.url
    },
    get path() {
        return url.parse(this.url).pathname
    },
    get query() {
        return url.parse(this.url, true).query
    }
}
module.exports = request