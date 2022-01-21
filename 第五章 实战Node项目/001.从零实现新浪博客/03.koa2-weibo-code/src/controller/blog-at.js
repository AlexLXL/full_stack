/**
 * @description 首页 Controller
 * @author 学浪
 */

const {
    getAtRelationCount,
} = require('../services/at-relation')
const { SuccessModel, ErrorModel } = require('../model/ResModel')

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

module.exports = {
    getAtMeCount
}