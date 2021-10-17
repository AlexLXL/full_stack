
### 题目: 实现strStr()
##### 给你两个字符串 haystack 和 needle ，请你在 haystack 字符串中找出 needle 字符串出现的第一个位置（下标从 0 开始）。如果不存在，则返回  -1 。
##### 这与 C 语言的 strstr() 以及 Java 的 indexOf() 定义相符

> 输入：haystack = "hello", needle = "ll"  
> 输出：2  
> 输入：haystack = "aaaaa", needle = "bba"  
> 输出：-1  
> 输入：haystack = "", needle = ""  
> 输出：0  
> 输入：haystack = "mississippi", needle = "issip"  
> 输出：4  

&nbsp;

---
思路一:  
1.使用正则
* 执行用时：76 ms, 在所有 JavaScript 提交中击败了70.85%的用户
* 内存消耗：40 MB, 在所有 JavaScript 提交中击败了14.29%的用户

思路二:  
1.使用for循环 + slice进行对比
* 执行用时：68 ms, 在所有 JavaScript 提交中击败了90.40%的用户
* 内存消耗：39.6 MB, 在所有 JavaScript 提交中击败了36.15%的用户

思路三:
1.官方解法,有点复杂,以后再花费时间看
---

&nbsp;

```
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
    if(needle === "") { return 0 }
    let hLen = haystack.length
    let nlen = needle.length
    for(let i = 0; i < hLen; i++) {
       if(haystack.slice(i, i + nlen) === needle) {
            return i
       }
    }
    return -1
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.多实用slice、subString这样的String函数

* 总结: 无
