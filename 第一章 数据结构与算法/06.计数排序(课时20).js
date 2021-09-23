// 计数排序
function counting_sort(A) {
    let max = Math.max(...A)
    // 计数数组
    let B = Array(max + 1).fill(0)
    // 结果数组
    let C = Array(A.length)
    // 累计位递增
    A.forEach((item) => {B[item]++})
    // 累计求和
    for (let i = 1; i < B.length; i++) {
        B[i] = B[i] + B[i-1]
    }
    // 结果取出
    A.forEach((item) => {
        let p = B[item] - 1
        B[item]--
        C[p] = item
    })

    return C
}
let A = [6, 5, 2, 2, 3, 3]
let result = counting_sort(A)
console.log(result)
// OUTPUT: [ 2, 2, 3, 3, 5, 6 ]