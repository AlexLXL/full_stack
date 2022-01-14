const {Blog, User} = require('./model');

(async function () {
    /**
     * 修改用户
     * UPDATE `users` SET `nickName` = '张三3' WHERE `userName` = 'zhangsan'
     */
    const zhangsanUpdate = await User.update({
        nickName: '张三3'
    }, {
        where: {
            userName: 'zhangsan'
        }
    })
    console.log('zhangsanUpdate:', zhangsanUpdate[0] > 0 ? '修改成功': '修改失败')
})()