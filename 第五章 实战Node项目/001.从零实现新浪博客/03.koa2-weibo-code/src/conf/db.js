/**
 * @description 存储配置
 * @author 学浪
 */
const {NODE_ENV, ENVS} = require('../utils/env')

let MYSQL_CONF = {
    [ENVS.DEV]: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'koa2_weibo_db'
    },
    [ENVS.PRD]: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'koa2_weibo_db'
    },
    [ENVS.TEST]: {
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: 'root',
        database: 'koa2_weibo_db'
    },
}

let REDIS_CONF = {
    [ENVS.DEV]: {
        host: '127.0.0.1',
        port: 6379
    },
    [ENVS.PRD]: {
        host: '127.0.0.1',
        port: 6379
    },
    [ENVS.TEST]: {
        host: '127.0.0.1',
        port: 6379
    },
}

module.exports = {
    MYSQL_CONF: MYSQL_CONF[NODE_ENV],
    REDIS_CONF: REDIS_CONF[NODE_ENV]
}