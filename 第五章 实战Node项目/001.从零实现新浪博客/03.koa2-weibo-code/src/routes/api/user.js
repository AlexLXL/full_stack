/**
 * @description 注册页API
 * @author 学浪
 */

const router = require('koa-router')()
const {isExist, register} = require('../../controller/user')

router.prefix('/api/user/')

router.post('/register', async (ctx, next) => {
    // 接收参数
    const { userName, password, gender } = ctx.request.body
    // 返回结果
    ctx.body = await register({ userName, password, gender })
})

router.post('/isExist', async (ctx, next) => {
    // 接收参数
    const { userName } = ctx.request.body
    // 返回结果
    ctx.body = await isExist(userName)
})

module.exports = router