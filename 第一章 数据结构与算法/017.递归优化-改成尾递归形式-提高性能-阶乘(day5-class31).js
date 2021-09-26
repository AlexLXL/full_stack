// 阶乘-一般写法
// function factorial(n) {
//     if (n === 0) return 1
//     return n * factorial(n - 1)
// }
// console.log(factorial(4)) // OUTPUT: 24

// 阶乘-尾递归: 返回值为递归函数调用(可结合while使用)
// function factorial(n, f= 1) {
//     if (n === 0) return f
//     return factorial(n - 1, f * n)
// }
// console.log(factorial(4)) // OUTPUT: 24
// 重点: 递归既可以一层层累加值(最后return 结果值)，也可以一层层返回值(迷宫问题,通过concat来接收)

// 编译器优化(Node会,chrome不会): 尾递归通常会被编译成循环
function factorial(n, f = 1) {
    while (true) {
        if (n === 0) {return f}
        [f, n] = [f * n, n - 1]
    }
}
console.log(factorial(4)) // OUTPUT:24