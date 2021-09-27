/**
 * LCS-长公共序列
 * 动态规划-二维数组填表法
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
    return dp[t.length][s.length]
}
console.log(lcs("BANANA", "ATANA")) // OUTPUT: 4
