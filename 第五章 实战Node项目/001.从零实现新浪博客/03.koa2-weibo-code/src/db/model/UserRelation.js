/**
 * @description 模型 UserRelation表
 * @author 学浪
 */

const seq = require('../seq')
const {INTEGER} = require('../types')

const Blog = seq.define('userRelation', {
    // 自动创建: id, 并设为主键、自增
    // 自动创建: createAt 和 updateAt
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户id'
    },
    followerId: {
        type: INTEGER,
        allowNull: false,
        comment: '关注人id'
    }
})

module.exports = Blog