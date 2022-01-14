const {Blog, User} = require('./model');

(async function () {
    /**
     * 删除博客
     * DELETE FROM `blogs` WHERE `id` = 4
     */
    /*const delBlogRes = await Blog.destroy({
        where: {
            id: 4
        }
    })
    console.log('delBlogRes:', delBlogRes[0] > 0 ? '删除成功': '删除失败')*/

    /**
     * 删除用户
     * DELETE FROM `blogs` WHERE `id` = 4
     * 报错的时候用try catch包裹一下, 看具体报错原因。可能是外键使用了严格模式(RESTRICT),改成连级(CASCADE)就好
     */
    try {
        const delUserRes = await User.destroy({
            where: {
                id: 1
            }
        })
        console.log('delUserRes', delUserRes)
    }catch (err) {
        console.log(err)
    }
})()