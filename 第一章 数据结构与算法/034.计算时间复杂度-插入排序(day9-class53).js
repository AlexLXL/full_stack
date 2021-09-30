/**
 * 插入排序-手写
 * [2,6,1,5,2,9,15,43,21]
 *
 * 循环不变式
 * A [][a1, a2, a3]
 *    i x
 */

function insertSort(A) {
    for (let i = 1; i < A.length; i++) {
        insert(A, i, A[i])
    }
}

function insert(A, i, x) {
    while (i > 0 && A[i - 1] > x) {
        A[i] = A[i - 1]
        A[i - 1] = x
        i--
    }
    A[i] = x;
}

let A = [2, 6, 1, 5, 2, 9, 15, 43, 21]
insertSort(A)
console.log(A)  // [ 1, 2, 2, 5, 6, 9, 15, 21, 43 ]