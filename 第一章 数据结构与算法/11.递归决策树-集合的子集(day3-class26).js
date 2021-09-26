// 递归和穷举

/**
 * 问题:1:列出(穷举)集合的子集
 * @param S 集合
 * @param decisions 决策数组
 * @returns Array 二维数组，数组里包含所有子集
 *
 * 注意点: concat是返回新数组，如果想要最后返回二维数组, concat的值就需要是二维数组
 * let a = [1,2]
 * let b = [[3]]
 * a.concat(b) // [1 ,2, [3]]
 *
 * 第29行用的是concat，而不是push的原因：
 *      1.参数需要是一个数组，concat会返回新数组
 *      2.push只会返回1/0
 *
 */
function findSubsets(S, decisions = Array()) {
    // 集合和决策数组相等，返回子集
    if (S.length === decisions.length) {
        let subset = S.reduce((total, value, index) => {
                    if (decisions[index]) total[0].push(value)
                    return total
                }, [[]])
        return subset
    }
    // 递归生成决策树
    let r = []
    r = r.concat( findSubsets(S, decisions.concat(true)) )
    r = r.concat( findSubsets(S, decisions.concat(false)) )
    return r
}
let S = ["a", "b", "c"]
console.log(JSON.stringify(findSubsets(S)))
// OUTPUT: [["a","b","c"],["a","b"],["a","c"],["a"],["b","c"],["b"],["c"],[]]

/**
 * 网上写法
 * @param arr
 * @returns {*}
 */
const f = arr => (
    arr.reduce((prev, next) => [
        ...prev, ...prev.map(item => [next, ...item])
        // 引入a -> 引入b -> 引入c
        // [],["a"]
        // ["b"],["b","a"]
        // ["c"],["c","a"],["c","b"],["c","b","a"]
    ], [[]])
)
console.log(JSON.stringify(f(S)))
// OUTPUT: [[],["a"],["b"],["b","a"],["c"],["c","a"],["c","b"],["c","b","a"]]