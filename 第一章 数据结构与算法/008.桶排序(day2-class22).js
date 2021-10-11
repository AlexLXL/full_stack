// 桶排序(非比较类型)
function insertionSort(A) {
    for (let i = 1; i < A.length; i++) {
        let p = i - 1;
        const x = A[p + 1]
        while (p >= 0 && A[p] > x) {
            A[p + 1] = A[p]
            p--
        }
        A[p + 1] = x
    }
}
function bucketSort(A, K, S) {
    // 循环不变式
    // A: 需要排序的数组
    // K：桶的数量
    // S：桶的大小
    // return 排序好的数组

    let buckets = Array(K).fill(0).map(_ => Array())
    // 放入桶中
    A.forEach((number) => {
        let idx = ~~( number / S )
        buckets[idx].push(number)
    })
    // 排序每只桶
    buckets.forEach((bucket) => {
        insertionSort(bucket)
    })
    // 取出数据
    return [].concat(...buckets)
}
const A = [23, 32, 1, 89, 67, 92, 50, 11, 54, 33]
console.log(bucketSort(A))
// OUTPUT: [ 1, 11, 23, 32, 33, 50, 54, 67, 89, 92 ]