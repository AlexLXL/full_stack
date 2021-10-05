/**
 * 归并排序-手写
 * [2,6,1,5,2,9,15,43,21]
 *
 * 循环不变式:
 * A, p, _q, r
 */

// 拆分函数
function mergeSort(A, p, r) {
    if (r - p < 2) { return }
    let q = Math.floor( (p+r)/2 )
    mergeSort(A, p, q)
    mergeSort(A, q, r)
    merge(A, p, q, r)
}

function merge(A, p, q, r) {
    // 花费掉N*lgN的空间
    let A1 = A.slice(p, q)
    let A2 = A.slice(q, r)
    A1.push(Number.MAX_SAFE_INTEGER)
    A2.push(Number.MAX_SAFE_INTEGER)
    // k指向新数组(其实就是A)的下标,注意是k = p
    // i指向A1的下标
    // j指向A2的下标
    for (let k = p, i = 0, j = 0; k < r; k++) {
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
    }
}

// let A = [6, 2, 1, 5, 2, 9, 15, 43, 21]
// mergeSort(A,0, A.length)
// console.log(A)  // [ 1, 2, 2, 5, 6, 9, 15, 21, 43 ]

module.exports = mergeSort

