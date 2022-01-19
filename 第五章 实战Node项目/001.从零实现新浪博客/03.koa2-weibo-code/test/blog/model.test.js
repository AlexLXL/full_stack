/**
 * @description blog model测试
 * @author 学浪
 */

const {Blog} = require('../../src/db/model/index')

/**
 * 示例: blog模型如果删了content属性, 实例就会缺少content属性
 */
test('User 模型的各个属性，符合预期', () => {
    // build 会构建一个内存的 Blog 实例，但不会提交到数据库中
    const blog = Blog.build({
        userId: 1,
        content: '测试内容_2131',
        image: '/flower.jpg',
    })
    // 验证各个属性
    expect(blog.userId).toBe(1)
    expect(blog.content).toBe('测试内容_2131')
    expect(blog.image).toBe('/flower.jpg')
})