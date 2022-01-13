const Sequelize = require('sequelize')

let conf = {
    host: 'localhost',
    dialect: 'mysql'
}

const seq = new Sequelize('koa2_weibo_db', 'root', 'root', conf)

module.exports = seq