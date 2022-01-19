/**
 * @description 首页API
 * @author 学浪
 */

const router = require('koa-router')();
const {loginCheck} = require('../../middlewares/loginChecks')
const {create} = require('../../controller/blog-home')
const blogValidate = require('../../validator/blog')
const {genValidator} = require('../../middlewares/validator')

router.prefix('/api/blog')

// 创建博客
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    // 接收参数
    const {content, image} = ctx.request.body
    const {id: userId} = ctx.session.userInfo
    // 返回结果
    ctx.body = await create({userId, content, image})
})

module.exports = router