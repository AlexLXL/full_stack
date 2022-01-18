/**
 * @description user service
 * @author 学浪
 */

const User = require('../db/model/User')
const {formatUser} = require('./_format')

/**
 * 获取用户信息
 * @param userName 用户名
 * @param password 密码
 */
async function getUserInfo(userName, password) {
    let whereOpt = {userName}
    if (password) {
        Object.assign(whereOpt, { password })
    }

    // 数据处理
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })

    // 格式化
    if (result == null) return result
    const formatRes = formatUser(result.dataValues)
    return formatRes
}

/**
 * 添加用户
 * @param userName
 * @param password
 */
async function createUser({userName, password, gender = 3, nickName}) {
    // 数据处理
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName,
    })

    // 格式化
    return result.dataValues
}

module.exports = {
    getUserInfo,
    createUser
}