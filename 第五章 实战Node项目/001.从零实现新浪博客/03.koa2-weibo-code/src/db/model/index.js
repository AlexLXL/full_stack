const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

Blog.belongsTo(User, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

/**
 * 由于上面占用了userId外键, 所以这个在数据库并不会有表现
 * 而加这行代码是sequelize连表查询的时候使用
 *
 * 注意: 在数据表里，外键和连表查询是没有任何关系的, 即使不做外键也可以连表查询
 */
Blog.belongsTo(UserRelation, {
    foreignKey: 'userId',
    targetKey: 'followerId'
})

Blog.hasMany(AtRelation, {
    foreignKey: 'blogId',
})

module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}