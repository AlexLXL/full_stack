/**
 * LCS-长公共序列
 * 用于基因比对，求相似性
 */

function lcs(s, t) {
    if (!s || !t) {
        return 0
    }
    // 最后一位相同时
    if (s[s.length - 1] === t[t.length - 1]) {
        return lcs(s.slice(0, s.length - 1), t.slice(0, t.length - 1)) + 1
    }
    // 最后一位不同时
    else {
        return Math.max(
            lcs(s.slice(0, s.length - 1), t),
            lcs(s, t.slice(0, t.length - 1))
        )
    }
}
let s = "BANANA"
let t = "ATANA"
console.log(lcs(s, t)) // OUTPUT: 4