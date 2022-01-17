/**
 * @description user service
 * @author 学浪
 */

const User = require('../db/model/User')
const {formatUser} = require('./_format')

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

module.exports = {
    getUserInfo
}