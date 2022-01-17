/**
 * @description user controller
 * @author 学浪
 */

const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {registerUserNameNotExistInfo} = require('../model/ErrorInfo')

const {getUserInfo} = require('../services/user')

async function isExist(userName) {
    // 业务逻辑处理
    const userInfo = await getUserInfo(userName)

    // 统一返回格式
    if (userInfo) {
        return new SuccessModel(userInfo) // { errno: 0, data: {...} }
    } else {
        return new ErrorModel(registerUserNameNotExistInfo) // { errno: 10003, message: '用户名未存在' }
    }
}

module.exports = {
    isExist
}