// 合并有序数组
// function merge(A, p, q, r) {
//     // 拆分两个有序数组
//     const A1 = A.slice(p, q);
//     const A2 = A.slice(q, r);
//     // 循环不变式
//     // i: A1的下标
//     // j: A2的下标
//     // k: 合并后数组的长度
//     for (let k = 0, i = 0, j = 0; k < A.length - 1; k++){
//         A[k] = A1[i] > A2[j] ? A2[j++] : A1[i++]
//     }
// }
// const A = [3, 7, 9, 1, 4, 10];
// merge(A, 0, 3, A.length)
// console.log(A) // OUTPUT: [ 1, 3, 4, 7, 9, 10 ]


// 归并排序（利用上面的思想，将一个数组递归拆成单个，再合并）
// 归并算法可以减少复杂度，拆成一个一个的过程相当于:
// 相当于T(100) => ( T(50) + T(50) ) * n // n是循环的次数，等效上面的k
function merge(A, p, q, r) {
    let A1 = A.slice(p, q);
    let A2 = A.slice(q, r);
    A1.push(Number.MAX_SAFE_INTEGER)
    A2.push(Number.MAX_SAFE_INTEGER)
    for (let k = p, i = 0, j = 0; k < r; k++){
        A[k] = A1[i] < A2[j] ? A1[i++] : A2[j++]
        // A1和A2的长度都为1时，要想把两个数都加进数组，起码比较两次
        // 但第二次比较A1或A2下标后移了一位，此时是undefined,因此需要push一个最大值
    }
}

function mergeSort(A, p, r) {
    if (r - p < 2) { return }
    let q = Math.ceil( (p+r)/2 );
    mergeSort(A, p, q)
    mergeSort(A, q, r)
    merge(A, p, q, r)
}
let A = [3, 7, 9, 1, 4, 10, 12, 54, 12, 1, 33, 90, 77,8];
mergeSort(A, 0, A.length)
console.log(A)
// OUTPUT: [ 1, 1, 3, 4, 7, 8, 9, 10, 12, 12, 33, 54, 77, 90 ]