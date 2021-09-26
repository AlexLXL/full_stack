/**
 * 递归优化重复子问题
 * 场景:
 * 如斐波拉契数列，fib(5) -> fib(4) + fib(3)
 *                          ||
 *                         fib(3) + fib(2)
 * f(3)就是重复计算的过程，想象成一颗树会更好可视化的理解。
 *
 */


/**
 * 正常写法:
 * 斐波拉契数列-求第n个值  O(2^n)  二叉树
 * @param n 下标为n
 * @returns {number|*}
 */
// function fib(n) {
//     if (n <= 1) {
//         return n
//     } else {
//         return fib(n - 1) + fib(n - 2)
//     }
// }
// console.log(fib(7))
// OUTPUT: 13

/**
 * 优化写法:
 *      1.自下而上-剔除重复计算(动态规划)
 * 斐波拉契数列-求第n个值 O(n)
 * @param n 下标为n
 * @returns {number}
 *
 * 总结: 自上而上类似将问题从树递归转为一维数组，然后找递增递减关系
 * 转一维数组后: [0, 1, 1, 2, 3, 5, 8, 13...]
 */
function fib(n) {
    let [a, b] = [0, 1]
    for (let i = 2; i <= n; i++) {
        [b, a] = [a + b, b]
    }
    return b
}
console.log(fib(7))
// OUTPUT: 13


/**
 * 正常写法:
 * 蚂蚱爬楼梯 - 总共与多少种爬法
 * 如3级楼梯: 3、2+1、1+2、111 四种爬法
 *
 * 类型属于多叉树 (分叉根据父叶子的值会越来越少)
 * @param n 楼梯阶数
 * @returns {number|*}
 */
// function steps(n) {
//     if (n <= 0) return 1
//     return [...Array(n).keys()].reduce((total, value) => {
//         return steps(value) + total
//     }, 0)
// }
// console.log(steps(6))
// OUTPUT: 32


/**
 * 优化写法:
 *      1.自下而上-剔除重复计算
 * 蚂蚱爬楼梯 - 总共与多少种爬法
 * @param n 楼梯阶数
 * @returns {number}
 *
 * 总结: 自上而上类似将问题从树递归转为一维数组，然后找递增递减关系
 * 转一维数组后: [1, 1, 2, 4, 8, 16, 32...]
 */
function steps(n) {
    let sequence = [1, 1]
    for (let i = 2; i <= n; i++) {
        sequence[i] = sequence.reduce((total, value) => total + value, 0)
    }
    return sequence.pop()
}
console.log(steps(6))
// OUTPUT: 32