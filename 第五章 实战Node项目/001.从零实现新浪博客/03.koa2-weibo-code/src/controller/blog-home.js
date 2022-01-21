/**
 * @description 首页 Controller
 * @author 学浪
 */

const xss = require('xss')
const {createBlog, getFollowersBlogList} = require('../services/blog')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {createBlogFailInfo} = require('../model/ErrorInfo')
const {PAGE_SIZE} = require('../conf/constant')
const {REG_FOR_AT_WHO} = require('../conf/constant')
const {getUserInfo} = require('../services/user')
const {createAtRelation} = require('../services/at-relation')

/**
 * 创建微博
 * @param {Object} param0 创建微博所需的数据 { userId, content, image }
 */
async function create({userId, content, image}) {
    // 分析at关系并存储
    // @的用户名列表
    let atUserNameList = []
    content = content.replace(
        REG_FOR_AT_WHO,
        (matchStr, nickName, userName) => {
            atUserNameList.push(userName)
            return matchStr
        }
    )

    // @的用户信息列表
    let atUserList = await Promise.all(
        atUserNameList.map(userName => getUserInfo(userName))
    )

    // @的用户id列表
    let atUserIdList = atUserList.map(user => user.id)


    try {
        const blog = await createBlog({
            userId,
            content: xss(content),
            image
        })

        await Promise.all(
            atUserIdList.map(userId => createAtRelation(blog.id, userId))
        )

        return new SuccessModel(blog)
    } catch (err) {
        console.log(err.message, err.stack)
        return new ErrorModel(createBlogFailInfo)
    }
}

/**
 * 首页列表
 * @param userId 用户id
 * @param pageIndex 页数
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    const result = await getFollowersBlogList(
        {
            userId,
            pageIndex,
            pageSize: PAGE_SIZE
        }
    )
    const {count, blogList} = result

    return new SuccessModel({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: PAGE_SIZE,
        pageIndex,
        count
    })
}

module.exports = {
    create,
    getHomeBlogList
}