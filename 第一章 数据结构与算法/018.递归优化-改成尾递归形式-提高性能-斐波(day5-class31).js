
// 斐波-一般写法:
// function fib(n) {
//     let [a, b] = [0, 1]
//     for (let i = 2; i <= n; i++) {
//         [b, a] = [a + b, b]
//     }
//     return b
// }
// console.log(fib(7)) // OUTPUT: 13

// 斐波-尾递归
function fib(n, a = 0, b = 1) {
    if (n <= 1) return b
    return fib(n - 1, b, a + b)
}
console.log(fib(7)) // OUTPUT: 13