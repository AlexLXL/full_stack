/**
 * @description sequelize 实例
 * @author 学浪
 */

const router = require('koa-router')()

/**
 * 获取登录信息
 * @param ctx ctx
 */
function getLoginInfo(ctx) {
    let data = {
        isLogin: false // 默认未登录
    }

    const userInfo = ctx.session.userInfo // 根据cookie去redis里拿session, 赋值到ctx.session
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }

    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})

module.exports = router