/**
 * @description utils api 路由
 * @author 学浪
 */

const router = require('koa-router')()
const {loginCheck} = require('../../middlewares/loginChecks')
const koaForm = require('formidable-upload-koa')
const {saveFile} = require('../../controller/utils')


router.prefix('/api/utils')

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    // 获取参数
    const file = ctx.req.files['file']
    if (!file) return;
    const {size, path, name, type} = file

    // 返回结果
    ctx.body = await saveFile({
        name,
        type,
        size,
        filePath: path
    })
})

module.exports = router