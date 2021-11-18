/**
 * 使用net (启动tcp服务)
 */

let net = require('net')
let server = net.createServer((socket) => {
    socket.on('data', (data) => {
        console.log(data.toString())
    })
    socket.end(`HTTP/1.1 200 OK
content-length=5

world
`)
})
server.listen(9092)
