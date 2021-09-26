/**
 * 组合问题: 从[1,2,3,4]个数里拿出2个(k个)进行组成
 * 拆分成递归的小问题: (1).取特殊值1,剩余数字[2,3,4]取1个(k-1个)
 *                  (2).不取特殊值,剩余数字[1,2,3,4]取2个(k个)
 * @param S 集合
 * @param n 要取的个数
 *
 * ...item其实是对应[ S.slice(0, k) ]的，因为如果一直拿不到值，最后还是去到相等时拿
 */
function combination(S, k) {
    if (k === 0 || S.length === k) {
        return [ S.slice(0, k) ]
    }
    let r = []
    let [first, ...other] = S
    r = r.concat( combination(other, k-1).map(item => [first, ...item]) )
    r = r.concat( combination(other, k).map(item => [...item]) )
    return r
}
let S = ["A", "B", "C", "D"]
console.log(JSON.stringify(combination(S, 2)))
// OUTPUT: [["A","B"],["A","C"],["A","D"],["B","C"],["B","D"],["C","D"]]