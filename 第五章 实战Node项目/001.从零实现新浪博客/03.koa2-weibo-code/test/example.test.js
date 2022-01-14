/**
 * @description 测试jest可用性
 * @author 学浪
 */

function add(a, b) {
    return a + b
}
test('10 + 20 = 30', () => {
    let count = add(10, 20)
    expect(count).toBe(30)
})