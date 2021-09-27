/**
 * LCS-长公共序列
 * 动态规划-二维数组填表法并构造结果
 * @param s 字符串
 * @param t 字符串
 */
function lcs(s, t) {
    let dp = []
    for (let y = 0; y <= t.length; y++) {
        dp[y] = []
        // 注意判断是小于等于,因为第0位是不放单词的
        for (let x = 0; x <= s.length; x++) {
            if (!y || !x) {
                dp[y][x] = 0
            }else if (s[x - 1] === t[y - 1]) {
                dp[y][x] = dp[y - 1][x - 1] + 1
            }else {
                dp[y][x] = Math.max(dp[y - 1][x], dp[y][x - 1])
            }
        }
    }
    return dp
}

function get_Result(dp, s, t, x = s.length, y = t.length, result = "") {
    if (!x || !y) {
        return result
    }
    if (s[x - 1] === t[y - 1]) {
        return get_Result(dp, s, t, x - 1, y - 1, result += s[x - 1])
    }else {
        if (dp[y - 1][x] > dp[y][x - 1]) {
            return get_Result(dp, s, t, x, y - 1, result)
        }else {
            return get_Result(dp, s, t, x - 1, y, result)
        }
    }

}
let dp = lcs("BANANA", "ATANA")
console.log(get_Result(dp, "BANANA", "ATANA")) // ANAA