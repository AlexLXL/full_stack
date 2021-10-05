/**
 * 快速排序-手写
 * [2,6,1,5,2,9,15,43,21]
 *
 * 循环不变式:
 * A, lo、hi、pivot
 */


function qSort(A, lo, hi) {
    if(hi - lo < 2) { return }
    let q = partition(A, lo, hi)
    qSort(A, lo, q)
    qSort(A, q, hi)
}
function partition(A, lo, hi) {
    let pivot = A[hi - 1]
    let i = lo - 1
    // 需要双指针一直往后，然后交换
    for (let j = lo; j < hi - 1; j++) {
        if (A[j] <= pivot) {
            i++
            swap(A, i, j)
        }
    }
    swap(A, i+1, hi-1)
    return i + 1
}
function swap(A, i, j) {
    [ A[i], A[j] ] = [ A[j], A[i] ]
}


// let A = [6, 2, 1, 5, 2, 9, 15, 43, 21]
// qSort(A,0, A.length)
// console.log(A)  // [ 1, 2, 2, 5, 6, 9, 15, 21, 43 ]

// 优化:
// 1.打乱数组
// 2.三个值中取一个值作为中心点

module.exports = qSort