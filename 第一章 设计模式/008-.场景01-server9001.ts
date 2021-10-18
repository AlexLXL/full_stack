export {}
let http = require("http")
let server = http.createServer((req, res)    => {
    res.setHeader('Content-Type','text/plain; charset=utf-8');
    res.end("9001端口")
})
server.listen(9001, () => {console.log(`9001端口`)})