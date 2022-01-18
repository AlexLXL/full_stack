/**
 * @description user controller
 * @author 学浪
 */

const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo
} = require('../model/ErrorInfo')
const {getUserInfo, createUser} = require('../services/user')
const doCrypto = require('../utils/cryp')

/**
 * 用户名是否存在
 * @param userName 用户名
 */
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

/**
 * 注册
 * @param userName 用户名
 * @param password 密码
 * @param gender 性别
 */
async function register({ userName, password, gender }) {
    // 业务逻辑处理
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorModel(registerUserNameExistInfo)
    }

    // 统一返回格式
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender })
        return new SuccessModel()
    }catch (err) {
        // 之后改成错误日志
        console.error(err.message, err.stack)
        return new ErrorModel(registerFailInfo)
    }
}

/**
 * 登录
 * @param ctx koa2 ctx
 * @param userName 用户名
 * @param password 密码
 */
async function login(ctx, userName, password) {
    // 业务逻辑处理
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        // 登录失败
        return new ErrorModel(loginFailInfo)
    }
    // 登录成功
    if (!ctx.session.userInfo) {
        ctx.session.userInfo = userInfo
    }

    // 统一返回格式
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login
}