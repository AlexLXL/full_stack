/**
 * @description 注册页API
 * @author 学浪
 */

const router = require('koa-router')();
const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
} = require('../../controller/user')
const {genValidator} = require('../../middlewares/validator')
const userValidate = require('../../validator/user')
const {loginCheck} = require('../../middlewares/loginChecks')
const {isTest} = require('../../utils/env')
const { getFollowers } = require('../../controller/user-relation')

router.prefix('/api/user')

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    // 接收参数
    const { userName, password, gender } = ctx.request.body
    // 返回结果
    ctx.body = await register({ userName, password, gender })
})

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    // 接收参数
    const { userName } = ctx.request.body
    // 返回结果
    ctx.body = await isExist(userName)
})

// 登录
router.post('/login', async (ctx, next) => {
    // 接收参数
    const { userName, password } = ctx.request.body
    // 返回结果
    ctx.body = await login(ctx, userName, password)
})

// 删除
router.post('/delete', async (ctx, next) => {
    if (isTest) {
        // 测试环境下，测试账号登录之后，删除自己
        const { userName } = ctx.session.userInfo
        // 返回结果
        ctx.body = await deleteCurUser(userName)
    }
})

// 修改个人信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    // 接收参数
    const { nickName, city, picture } = ctx.request.body
    // 返回结果
    ctx.body = await changeInfo(ctx, { nickName, city, picture })
})

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    // 接收参数
    const {password, newPassword} = ctx.request.body
    const {userName} = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)
})

// 退出登录
router.post('/logout', loginCheck, async (ctx, next) => {
    ctx.body = await logout(ctx)
})

// 获取 at 列表，即关注人列表
router.get('/getAtList', loginCheck, async (ctx, next) => {
    const {id: userId} = ctx.session.userInfo
    const result = await getFollowers(userId)
    const {followersList} = result.data
    const list = followersList.map(user => {
        return `${user.nickName} - ${user.userName}`
    })
    // 格式如 ['张三 - zhangsan', '李四 - lisi', '昵称 - userName']
    ctx.body = list
})

module.exports = router