/**
 * @description 注册页API
 * @author 学浪
 */

const router = require('koa-router')()
const {isExist} = require('../../controller/user')

router.prefix('/api/user/')

router.post('/register', async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body
})

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body
    ctx.body = await isExist(userName)
})

module.exports = router