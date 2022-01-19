/**
 * @description user controller
 * @author 学浪
 */

const {SuccessModel, ErrorModel} = require('../model/ResModel')
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    registerFailInfo,
    loginFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo
} = require('../model/ErrorInfo')
const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
} = require('../services/user')
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
async function register({userName, password, gender}) {
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
            gender
        })
        return new SuccessModel()
    } catch (err) {
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

/**
 * 删除当前用户
 * @param userName 用户名
 */
async function deleteCurUser(userName) {
    // 业务逻辑处理

    // 统一返回格式
    const result = await deleteUser(userName)
    if (result) {
        return new SuccessModel()
    }
    return new ErrorModel(deleteUserFailInfo)
}

/**
 * 修改用户信息
 * @param ctx ctx
 * @param nickName 昵称
 * @param city 城市
 * @param picture 头像
 */
async function changeInfo(ctx, {nickName, city, picture}) {
    // 业务逻辑处理
    const {userName} = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }
    const result = await updateUser({
        newNickName: nickName,
        newCity: city,
        newPicture: picture
    }, {
        userName
    })

    // 统一返回格式
    if (result) {
        // 更新成功
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessModel()
    }
    return new ErrorModel(changeInfoFailInfo)
}

/**
 * 修改密码
 * @param userName 用户名
 * @param password 密码
 * @param newPassword 新密码
 */
async function changePassword(userName, password, newPassword) {
    // 业务逻辑处理
    const result = await updateUser(
        {
            newPassword:　doCrypto(newPassword)
        },
        {
            userName,
            password: doCrypto(password)
        }
    )
    // 统一返回格式
    if (result) {
        // 成功
        return new SuccessModel()
    }
    // 失败
    return new ErrorModel(changePasswordFailInfo)
}

/**
 * 退出登录
 * @param {Object} ctx ctx
 */
async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessModel()
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}