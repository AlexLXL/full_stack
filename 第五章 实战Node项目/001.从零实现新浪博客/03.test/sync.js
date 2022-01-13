const seq = require('./seq')
require('./model')

// 创建连接
seq.authenticate().then(() => {
    console.log('auth ok')
}).catch(() => {
    console.log('auth error')
})

seq.sync({ force: true }).then(() => {
    console.log('sync ok')
    process.exit()
}).catch((err) => {
    console.log(err)
    process.exit()
})