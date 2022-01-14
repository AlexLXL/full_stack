const Sequelize = require('sequelize')
const seq = require('./seq')

/**
 * 创建User模型 (建表)
 * 数据表的名字会自动改为users
 */
const User = seq.define('user', {
    // 自动创建: id, 并设为主键、自增
    // 自动创建: createAt 和 updateAt
    userName: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },
    password: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },
    nickName: {
        type: Sequelize.STRING, // varchar(255),
        comment: '昵称'
    }
})

/**
 * 创建Blog模型 (建表)
 * 数据表的名字会自动改为blogs
 */
const Blog = seq.define('blog', {
    // 自动创建: id, 并设为主键、自增
    // 自动创建: createAt 和 updateAt
    title: {
        type: Sequelize.STRING, // varchar(255)
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT, // varchar(255)
        allowNull: false
    },
    userId: {
        type: Sequelize.INTEGER, // varchar(255),
        allowNull: false
    }
})

/**
 * 创建外键 Blog.userId -> User.id
 * 默认关联的就是id
 * 如果查Blog,会自动去查User
 * 如果查User,会自动去查Blog
 */
Blog.belongsTo(User, {
    foreignKey: 'userId'
})
User.hasMany(Blog, {
    foreignKey: 'userId'
})

module.exports = {
    User,
    Blog
}
