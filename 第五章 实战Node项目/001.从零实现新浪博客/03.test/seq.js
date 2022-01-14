const Sequelize = require('sequelize')

let conf = {
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    // 线下用简单连接. 线上用连接池
    // pool: {
    //     max: 5,
    //     min: 0,
    //     idle: 10000 // 如果一个连接池 10s 之内没有被使用， 则释放
    // },
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'root', conf)

module.exports = seq