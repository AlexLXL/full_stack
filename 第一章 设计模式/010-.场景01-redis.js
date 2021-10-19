// 需要安装软件才能启动，先跳过
// let redis = require("redis")
// let client1 = redis.createClient(6379, "127.0.0.1")
// let client2 = redis.createClient(6379, "127.0.0.1")
// client1.subscribe("channel_a")
// client1.subscribe("channel_b")
// client1.on("message", (channel, message) => {
//     console.log("client1", channel, message)
// })
//
// client2.publish("channel_a", "hello_a")
// client2.publish("channel_b", "hello_a")