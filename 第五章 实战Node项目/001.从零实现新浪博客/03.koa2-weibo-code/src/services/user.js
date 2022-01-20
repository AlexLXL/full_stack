/**
 * @description user service
 * @author 学浪
 */

const User = require('../db/model/User')
const {formatUser} = require('./_format')
const {addFollower} = require('./user-relation')

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
 * @param userName 用户名
 * @param password 密码
 * @param gender 性别
 * @param nickName 昵称
 */
async function createUser({userName, password, gender = 3, nickName}) {
    // 数据处理
    const result = await User.create({
        userName,
        password,
        gender,
        nickName: nickName ? nickName : userName,
    })
    const data = result.dataValues

    // 自己关注自己（为了方便首页获取数据）
    addFollower(data.id, data.id)

    // 格式化
    return data
}

/**
 * 删除用户
 * @param userName 用户名
 */
async function deleteUser(userName) {
    // 数据处理
    const result = await User.destroy({
        where: {
            userName
        }
    }) // result 删除的行数

    // 格式化
    return result > 0
}

/**
 * 更新用户信息
 * @param newNickName 新昵称
 * @param newCity 新城市
 * @param newPicture 新头像
 * @param newPassword 新密码
 * @param userName 用户名
 * @param password 密码
 */
async function updateUser(
    { newNickName, newCity, newPicture, newPassword },
    {userName, password}
) {
    // 数据处理
    const updateData = {}
    if (newNickName) updateData.nickName = newNickName
    if (newCity) updateData.city = newCity
    if (newPicture) updateData.picture = newPicture
    if (newPassword) updateData.password = newPassword

    const whereOpt = { userName }
    if (password) whereOpt.password = password

    const result = await User.update(updateData, {
        where: whereOpt
    })

    // 格式化
    return result[0] > 0
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
}