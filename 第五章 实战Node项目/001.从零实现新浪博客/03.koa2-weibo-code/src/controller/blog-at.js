/**
 * @description 首页 Controller
 * @author 学浪
 */

const {
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
} = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { PAGE_SIZE } = require('../conf/constant')

/**
 * 获取 @我 的数量
 * @param userId 用户id
 */
async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessModel({
        count
    })
}

/**
 * 获取 @ 用户的微博列表
 * @param {number} userId user id
 * @param {number} pageIndex page index
 */
async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize: PAGE_SIZE
    })
    const { count, blogList } = result

    // 返回
    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

/**
 * 标记为已读
 * @param {number} userId userId
 */
async function markAsRead(userId) {
    try {
        await updateAtRelation(
            { newIsRead: true },
            { userId, isRead: false }
        )
    } catch (ex) {
        console.error(ex)
    }

    // 不需要返回 SuccessModel 或者 ErrorModel
}

module.exports = {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
}