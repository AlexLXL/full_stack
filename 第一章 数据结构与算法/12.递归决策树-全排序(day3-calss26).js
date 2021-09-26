// 递归和穷举

/**
 * 全排列问题抽象
 * @param str
 * @param decision
 *
 * 注意点:
 * 1.for in 字符串拿到的是下标
 *
 * 排列ABC => [ 'ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA' ]
 * 在决策树中,第一次决策有3种，第二次决策有两种，第三次决策有三种。所以总数为: 3! = 3* 2 * 1
 * 过程:
 *  (1).从ABC中拿一个值,如A (2).从BC中取一个值,如B， (3).从C中取一个值, C => 组合起来ABC
 *  (1).从ABC中拿一个值,如A (2).从BC中取一个值,如C， (3).从B中取一个值, B => 组合起来ACB
 */
function permutation(str, decision = "") {
    // 循环不变式
    // str: 字符串
    // decisions: 决策字符串

    // 所有决策完成
    if (str.length === decision.length) {
        return decision
    }
    let r = []
    let regExp = eval(`/[${decision}]/g`)
    for (c of str.replace(regExp, "")) {
        r = r.concat(permutation(str, decision + c))
    }
    return r
}

let str = "ABC"
console.log(permutation(str))
// OUTPUT: [ 'ABC', 'ACB', 'BAC', 'BCA', 'CAB', 'CBA' ]