
### 无重复字符的最长子串

##### 给定一个字符串 s ，请你找出其中不含有重复字符的 最长子串 的长度。

> 输入: s = "abcabcbb"  
  输出: 3   
  解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。  

> 输入: s = "bbbbb"  
  输出: 1  
  解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1。  

> 输入: s = "pwwkew" 
  输出: 3 
  解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。 
       请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串。 
  
> 输入: s = ""  
  输出: 0  

---

正确思路
1.滑动窗口(set + 右指针)

错误思路: 
1.循环套循环, 暴力破解

---

```
var lengthOfLongestSubstring = function(s) {
    // 哈希集合，记录每个字符是否出现过
    const occ = new Set();
    const n = s.length;
    // 右指针，初始值为 -1，相当于我们在字符串的左边界的左侧，还没有开始移动
    let rk = -1, ans = 0;
    for (let i = 0; i < n; ++i) {
        if (i != 0) {
            // 左指针向右移动一格，移除一个字符
            occ.delete(s.charAt(i - 1));
        }
        while (rk + 1 < n && !occ.has(s.charAt(rk + 1))) {
            // 不断地移动右指针
            occ.add(s.charAt(rk + 1));
            ++rk;
        }
        // 第 i 到 rk 个字符是一个极长的无重复字符子串
        ans = Math.max(ans, rk - i + 1);
    }
    return ans;
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习:  
1. 滑动窗口(set + 右指针)

* 总结: 无
