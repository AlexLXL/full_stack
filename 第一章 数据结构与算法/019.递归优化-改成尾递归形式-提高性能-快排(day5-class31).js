// 快排-一般写法
function qSort(A, lo = 0, hi = A.length) {
    if (lo <= hi) return
    const p = partition(A, lo, hi)
    qSort(A, lo, p)
    qSort(A, p, hi)
}
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

// 快排-尾递归
// 这个有点不规范,不是 `return 递归函数执行()` 的方式
function qSortV2(A, lo = 0, hi = A.length) {
    while(lo < hi) {
        let p = qSort(A, lo, p) // 先排好左边
        lo = p + 1  // 再排右边
    }
}