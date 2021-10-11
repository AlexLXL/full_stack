// 基数排序（非对比）
function radixSort(A) {
    let max = Math.max(...A)
    let buckets = Array(10).fill(0).map(_ => Array())
    // 位数
    let m = 1;
    while (m < max) {
        // 放入桶中
        A.forEach(number => {
            let digit = ~~( ( number % (m * 10) / m ) )
            buckets[digit].push(number)
        })
        // 从桶中取出
        let j = 0
        buckets.forEach(bucket => {
            while (bucket.length) {
                A[j++] = bucket.shift()
            }
        })
        // 下一个位数
        m *= 10
    }
}
const A = [10, 22, 22, 33, 33, 10, 15, 104, 34, 101, 200]
radixSort(A);
console.log(A)
// OUTPUT: [ 10, 10, 15, 22, 22, 33, 33, 34, 101, 104, 200 ]