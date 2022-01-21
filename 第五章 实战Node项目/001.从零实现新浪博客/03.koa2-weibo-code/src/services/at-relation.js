/**
 * @description 微博 @ 用户关系 service
 * @author 学浪
 */

const { AtRelation, Blog, User } = require('../db/model/index')

/**
 * 创建微博 @ 用户的关系
 * @param {number} blogId 微博 id
 * @param {number} userId 用户 id
 */
async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}

module.exports = {
    createAtRelation,
}