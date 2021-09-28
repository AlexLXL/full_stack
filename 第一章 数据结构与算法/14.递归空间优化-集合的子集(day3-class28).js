/**
 * 集合的子集-递归空间优化
 * @param S
 * @returns {Generator<string, void, *>}
 *
 * 注意点: ...运算符可以把迭代器运行完
 * 所有的递归决策树都可以转化为01的问题
 */
function * subsets(S) {
    // 循环叶子次数
    for (let i = 0; i < 1 << S.length; i++) {
        let r = []
        // 循环数组长度
        for (let j = 0; j < S.length; j++) {
            let take = i & (1 << j)
            take && r.push(S[j])
        }
        console.log(r.join(""))
        yield r.join("")
    }
}
let S = ["a", "b", "c"]
console.log([...subsets(S)])
// OUTPUT: [ '', 'a', 'b', 'ab', 'c', 'ac', 'bc', 'abc' ]

// let g = subsets(S)
// g.next() // ''
// g.next() // 'a'
// g.next() // 'b'
// g.next() // 'ab'
// g.next() // 'c'
// g.next() // 'ac'
// g.next() // ...