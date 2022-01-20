/**
 * @description 用户关系 controller
 * @author 学浪
 */

const {
    getUsersByFollower,
    addFollower
} = require('../services/user-relation')
const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {addFollowerFailInfo} = require('../model/ErrorInfo')

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

module.exports = {
    getFans,
    follow
}