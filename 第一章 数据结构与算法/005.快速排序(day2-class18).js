// 交换一次
// function swap(A, i, j) {
//     [ A[i], A[j] ] = [ A[j], A[i] ];
// }
// function partition(A, lo, hi = A.length) {
//     let pivot = A[hi - 1]
//     let i = lo, j = hi - 1
//     // 小于中心点范围: [lo, i)
//     // 未确定范围: [i, j)
//     // 大于 中心点范围: [j, hi-1)
//     while (i !== j) {
//         if (A[i] <= pivot) {
//             i++
//         }else {
//             swap(A, i, --j)
//         }
//     }
//     swap(A, j, hi - 1)
//     return j
// }
//
// let A = [20, 18, 11, 13, 9, 6, 2, 21, 10]
// partition(A, 0, A.length)
// console.log(A)
// OUTPUT: [ 2, 6, 9, 10, 11, 18, 21, 20, 13 ]


// 快速排序
function swap(A, i, j) {
    [ A[i], A[j] ] = [ A[j], A[i] ];
}
function partition(A, lo = 0, hi = A.length) {
    let pivot = A[hi - 1]
    let i = lo, j = hi - 1
    // 小于中心点范围: [lo, i)
    // 未确定范围: [i, j)
    // 大于 中心点范围: [j, hi-1)
    while (i !== j) {
        if (A[i] <= pivot) {
            i++
        }else {
            swap(A, i, --j)
        }
    }
    swap(A, j, hi - 1);

    return j
}
function qSort(A, lo = 0, hi = A.length) {
    if (hi - lo <= 1) { return }
    let p = partition(A, lo, hi);
    qSort(A, lo, p)
    qSort(A, p, hi)
}
let A = [20, 18, 11, 13, 9, 6, 2, 21, 10]
qSort(A, 0, A.length)
console.log(A)
// OUTPUT: [ 2, 6, 9, 10, 11, 13, 18, 20, 21 ]