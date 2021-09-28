/**
 * 从N个数中取M:
 * sumN([1, 3, 8, 5, 2], 2, 11)     从第一个数组中取2个数，和为11
 * OUTPUT: [3, 8]
 *
 * sumN([1, 3, 8, 5, 2], 4, 3)     从第一个数组中取4个数，和为3
 * OUTPUT: null
 *
 * ★决策树问题都可以转换成01选不选择问题
 * ★ i & 1<<j 即选中当前位
 */


// 递归决策树
function sumN(A, n, m, i = 0, decisions = []) {
    if (m === 0 && n === 0) {
        return decisions
    }
    if (A.length === i || n === 0 || m < 0) {
        return null
    }
    return sumN(A, n - 1, m - A[i], i + 1, decisions.concat(A[i]))
        || sumN(A, n, m, i + 1, decisions)
}
console.log(sumN([1, 3, 8, 5, 2], 2, 11))    // OUTPUT: [ 3, 8 ]
console.log(sumN([1, 3, 8, 5, 2], 4, 3))     // OUTPUT: null


// 递归决策树优化-单decisions,降低空间复杂度
function sumN(A, n, m) {
    let r = null
    let decisions = []
    function inner(i = 0, n, m) {
        if (r) { return }
        if (m === 0 && n === 0) {
            r = decisions.slice()
            return;
        }
        if (A.length === i || n === 0) {
            return;
        }
        decisions.push(A[i])
        inner(i + 1, n - 1, m - A[i])
        decisions.pop()
        inner(i + 1, n, m)
    }
    inner(0, n,  m)
    return r
}
console.log(sumN([1, 3, 8, 5, 2], 2, 11))   // OUTPUT: [ 3, 8 ]
console.log(sumN([1, 3, 8, 5, 2], 4, 3))    // OUTPUT: null


// 递归决策树 => 位运算优化
// [1,2,3,4,5]
// [1,0,0,1,1] => [1,4,5]
function sumN(A, n, m) {
    // 叶子节点数
    let leafNum = 1 << A.length
    for (let i = 0; i < leafNum; i++) {

        let p = []
        let sum = 0
        // 第i个叶子的位数
        for (let j = 0; j < A.length; j++) {
            if (i & (1 << j)) {
                p.push(A[j])
                sum += A[j]
            }
        }
        if (sum === m && n === p.length) {
            return p
        }

    }
    return null
}
console.log(sumN([1, 3, 8, 5, 2], 2, 11))   // OUTPUT: [ 3, 8 ]
console.log(sumN([1, 3, 8, 5, 2], 4, 3))    // OUTPUT: null