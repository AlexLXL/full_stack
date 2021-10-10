
### 题目: 反转字符串

> 输入：s = ["h","e","l","l","o"]  
> 输出：["o","l","l","e","h"]  
> 输入：s = ["H","a","n","n","a","h"]  
> 输出：["h","a","n","n","a","H"]  

---
思路一:  
1.转ASCII然后抑或运算交换,性能最优,但内存空间占太多
● 执行用时超越    100%
● 执行消耗内存超越  7%

思路二:
2.循环，对称交换值
● 执行用时超越    52%
● 执行消耗内存超越  82%

思路三:
3.双指针交换值(期间缓存变量)
● 执行用时超越    82%
● 执行消耗内存超越  81%
---

```
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let len = s.length
    let count = ~~(len / 2)
    for(let i = 0, j = len - 1; i < count; i++, j--) {
        let temp = s[i]
        s[i] = s[j]
        s[j] = temp
    }
};

```

* 技巧:  

* 优化空间: 无

* 学习:  

* 总结: 
1.适当使用双指针和缓存变量提升性能