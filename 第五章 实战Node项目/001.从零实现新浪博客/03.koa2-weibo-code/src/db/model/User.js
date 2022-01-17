/**
 * @description 模型 user表
 * @author 学浪
 */

const seq = require('../seq')
const {STRING, DECIMAL} = require('../types')

const User = seq.define('user', {
    // 自动创建: id, 并设为主键、自增
    // 自动创建: createAt 和 updateAt
    userName: {
        type: STRING, // varchar(255)
        allowNull: false,
        unique: true,
        comment: '用户名'
    },
    password: {
        type: STRING, // varchar(255)
        allowNull: false,
        comment: '密码'
    },
    nickName: {
        type: STRING, // varchar(255),
        allowNull: false,
        comment: '昵称'
    },
    gender: {
        type: DECIMAL, // DECIMAL(10,0)
        allowNull: false,
        defaultValue: 3,
        comment: '性别（1 男性，2 女性，3 保密）'
    },
    picture: {
        type: STRING, // varchar(255),
        comment: '头像 图片地址'
    },
    city: {
        type: STRING, // varchar(255),
        comment: '城市'
    },
})

module.exports = User