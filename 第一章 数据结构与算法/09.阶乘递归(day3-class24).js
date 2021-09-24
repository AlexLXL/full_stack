/**
 * 阶乘递归
 * @param n 阶乘的数
 * @returns {number}
 *
 * n! = 1 * 2 * 3 * ... * (n-1) * n
 */
function factorial(n) {
    if (n === 0) {
        return 1
    }else {
        return n * factorial(n - 1)
    }
}

console.log(factorial(3))
// OUTPUT: 6