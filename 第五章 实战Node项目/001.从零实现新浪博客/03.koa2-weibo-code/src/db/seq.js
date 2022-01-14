/**
 * @description sequelize 实例
 * @author 学浪
 */

const Sequelize = require('sequelize')
const {MYSQL_CONF} = require('../conf/db')
const {isPrd, isTest} = require('../utils/env')

const {host, port, database, user, password} = MYSQL_CONF
let conf = {
    host: host,
    port: port,
    dialect: 'mysql',
    timezone: '+08:00',
}

if (isPrd) {
    // 线下用简单连接. 线上用连接池
    conf.pool = {
        max: 5,
        min: 0,
        idle: 10000 // 如果一个连接池 10s 之内没有被使用， 则释放
    }
}

if (isTest) {
    // 不打印sql语句
    conf.logging = () => {}
}

const seq = new Sequelize(database, user, password, conf)

module.exports = seq