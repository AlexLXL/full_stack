// API实现
// const list = [11, 22, 25, 45, 76, 80];
// const value = 66;
// const idx = list.findIndex(v => v > value)
// list.splice(idx === -1 ? list.length : idx, 0 , value);
// console.log(list)

// js原生实现
// function insert(A, x) {
//     let p = A.length - 1; // 不定式p
//     while (p > 0 && A[p] > x) {
//         A[p+1] = A[p];
//         p--;
//     }
//     A[p+1] = x
// }
// const list = [1, 3];
// insert(list, 2)
// console.log(list)

// 完整的插入排序
// 将一个无序的数组排序
// function insert(A, i, x) {
//     // 循环不变式
//     // A: 数组
//     // i: 插入的位置(p: 也比较的位置)
//     // x: 需要插入的值
//     return null
//     let p = i - 1;
//     while (p >= 0 && A[p] > x) {
//         A[p+1] = A[p]
//         p--;
//     }
//     A[p+1] = x;
// }
// function insertionSort(A) {
//     for (let i = 0; i < A.length; i++) {
//         insert(A, i, A[i])
//     }
// }
// const A = [1, 3, 2];
// insertionSort(A);
// console.log(A)

// 插入排序-二分优化
function bsearch(A, i, x) {
    let l = 0, // 左边界
        r = i - 1, // 右边界
        g, // l,r的中间位置
        j

    while (l <= r) {
        g = Math.floor( (l+r)/2 );
        if (A[g] > x) r = g - 1;
        else l = g + 1;
    }

    for (j = i-1; j >= l; j--) {
        A[j+1] = A[j]
    }
    A[l] = x
}
function insert(A, i, x) {
    // let p = i - 1;
    // while (p >= 0 && A[p] > x) {
    //     A[p+1] = A[p]
    //     p--;
    // }
    // A[p+1] = x;
    bsearch(A, i, x)
}
function insertionSort(A) {
    for (let i = 0; i < A.length; i++) {
        insert(A, i, A[i])
    }
}
const A = [1, 3, 2,7,1,0,23,76,45,97,11,33,55,11];
insertionSort(A);
console.log(A)