/**
 * @description 用户关系 controller
 * @author 学浪
 */

const {
    getUsersByFollower,
    addFollower,
    deleteFollower
} = require('../services/user-relation')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {
    addFollowerFailInfo,
    deleteFollowerFailInfo
} = require('../model/ErrorInfo')

/**
 * 根据 userid 获取粉丝列表
 * @param {number} userId 用户 id
 */
async function getFans(userId) {
    const {count, userList} = await getUsersByFollower(userId)

    // 返回
    return new SuccessModel({
        count,
        fansList: userList
    })
}

/**
 * 关注
 * @param myUserId 登录id
 * @param curUserId 准备关注的id
 */
async function follow(myUserId, curUserId) {
    try {
        await addFollower(myUserId, curUserId)
        return new SuccessModel()
    }catch (err) {
        console.log(err.message, err.stack)
        return new ErrorModel(addFollowerFailInfo)
    }
}

/**
 * 取消关注
 * @param {number} myUserId 当前登录的用户 id
 * @param {number} curUserId 要被关注的用户 id
 */
async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteFollowerFailInfo)
}

module.exports = {
    getFans,
    follow,
    unFollow
}