const WebSocket = require('ws'); // 引入模块
const ws = new WebSocket.Server({port: 9090}, () => { // 监听接口
    console.log("socket start")
})

let clients = [];
ws.on('connection', (client) => {
    clients.push(client)
    client.send(JSON.stringify("hello"));
    client.on('message', (msg) => {
        client.send(JSON.stringify(msg));
    })
    client.on('close', (msg) => {
        console.log("关闭服务器连接")
    })
})