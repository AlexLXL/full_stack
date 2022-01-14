/**
 * @description 连接 redis 的方法 get set
 * @author 学浪
 */

const {createClient} = require('redis')
const {REDIS_CONF} = require('../conf/db')

// 创建客户端
const client = createClient(REDIS_CONF.port, REDIS_CONF.host)
client.on('error', (err) => console.log('Redis Client Error', err))
client.connect().then(() => {
    console.log('连接redis成功')
}).catch((err) => {
    console.log('连接redis失败:', err)
})

/**
 * @description 获取
 * @param key 键
 */
async function get(key) {
    const value = await client.get(key)
    try {
        return JSON.parse(value)
    } catch(err) {
        return value
    }
}

/**
 * 设置
 * @param key 键
 * @param val 值
 * @param timeout 过期时间, 单位 s
 */
async function set(key, val, timeout = 60 * 60) {
    if(typeof val === 'object') val = JSON.stringify(val)
    await client.set(key, val)
    await client.expire(key, timeout)
}

module.exports = {
    get,
    set
}
