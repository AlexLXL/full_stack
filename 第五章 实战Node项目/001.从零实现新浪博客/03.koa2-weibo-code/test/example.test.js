/**
 * @description 测试jest可用性
 * @author 学浪
 */

const server = require('./server')

/**
 * 可行性测试
 */
function add(a, b) {
    return a + b
}
test('10 + 20 = 30', () => {
    let count = add(10, 20)
    expect(count).toBe(30)
})

/**
 * get测试
 */
test('接口测试: /json', async () => {
    const res = await server.get('/json')
    expect(res.body).toEqual({title: 'koa2 json'})
})

/**
 * post测试
 */
test('接口测试: /json', async () => {
    const res = await server.post('/postjson').send({
        message: '123'
    })
    expect(res.body).toEqual({title: '123'})
})