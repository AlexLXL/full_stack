/**
 * @description 首页 Service
 * @author 学浪
 */

const {Blog} = require('../db/model')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image }
 */
async function createBlog({userId, content, image}) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

module.exports = {
    createBlog
}