const {createClient} = require('redis');

(async () => {
    // 创建客户端
    const client = createClient(6379, '127.0.0.1');
    client.on('error', (err) => console.log('Redis Client Error', err));
    await client.connect()

    // 设置值
    await client.set('myname3', 'boom3')
    const value = await client.get('myname2')
    client.disconnect()
})();