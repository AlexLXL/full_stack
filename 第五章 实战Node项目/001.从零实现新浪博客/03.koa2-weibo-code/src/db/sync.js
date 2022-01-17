/**
 * @description sequelize 同步数据库
 * @author 学浪
 */

const seq = require('./seq')
require('./model');

// 测试连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth error')
})

// 同步数据库
seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
}).catch((err) => {
    console.log('sync error', err)
    process.exit()
})