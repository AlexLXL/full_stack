/**
 * @description 模型 blog表
 * @author 学浪
 */

const seq = require('../seq')
const {STRING, INTEGER, TEXT} = require('../types')

const Blog = seq.define('blog', {
    // 自动创建: id, 并设为主键、自增
    // 自动创建: createAt 和 updateAt
    userId: {
        type: INTEGER, // varchar(255)
        allowNull: false,
        comment: '用户id'
    },
    content: {
        type: TEXT, // TEXT
        allowNull: false,
        comment: '内容'
    },
    image: {
        type: STRING, // varchar(255),
        comment: '图片'
    },
})

module.exports = Blog