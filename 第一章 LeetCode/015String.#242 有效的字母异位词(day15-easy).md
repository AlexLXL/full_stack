
### 题目: 有效的字母异位词
##### 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。
##### 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。
    
> 输入: s = "anagram", t = "nagaram"  
> 输出: true  
> 输入: s = "rat", t = "car"  
> 输出: false  

&nbsp;

---
思路一:  
1.循环一次,哈希表存s和t出现次数,s的值++,t的值--  
* 执行用时：92 ms, 在所有 JavaScript 提交中击败了59.19%的用户  
* 内存消耗：39.9 MB, 在所有 JavaScript 提交中击败了72.82%的用  

思路二:  
1.转ASCII存在数组,循环一次对比数组  
* 执行用时：72 ms, 在所有 JavaScript 提交中击败了97.61%的用户  
* 内存消耗：38.8 MB, 在所有 JavaScript 提交中击败了93.67%的用  

思路二:  
1.排序,循环一次对比字符串  
* 执行用时：188 ms, 在所有 JavaScript 提交中击败了5.58%的用户  
* 内存消耗：45.8 MB, 在所有 JavaScript 提交中击败了5.02%的用户  
---

&nbsp;

```
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 * 思路一: 
 * 1.循环一次,哈希表存s和t出现次数,s的值++,t的值--
 * 执行用时：92 ms, 在所有 JavaScript 提交中击败了59.19%的用户
 * 内存消耗：39.9 MB, 在所有 JavaScript 提交中击败了72.82%的用户
 * 
 * 思路二: 
 * 1.转ASCII存在数组,循环一次对比数组
 * 执行用时：72 ms, 在所有 JavaScript 提交中击败了97.61%的用户
 * 内存消耗：38.8 MB, 在所有 JavaScript 提交中击败了93.67%的用户
 * 
 * 思路二: 
 * 1.排序,循环一次对比字符串
 * 执行用时：188 ms, 在所有 JavaScript 提交中击败了5.58%的用户
 * 内存消耗：45.8 MB, 在所有 JavaScript 提交中击败了5.02%的用户
 * 
 */
var isAnagram = function(s, t) {
    if(s.length !== t.length) { return false }
    let counter = new Uint16Array(26)
    for(let i = 0; i < s.length; i++) {
        counter[s[i].charCodeAt() - 97]++
        counter[t[i].charCodeAt() - 97]--
    }
    for(let i = 0; i < counter.length; i++) {
        if(counter[i] !== 0) {
            return false
        }
    }
    return true
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.014String.#387的思想,用Uint16Array存储小写字母
2.小写a的ASCII -- 97
  小写A的ASCII -- 65


* 总结:  
1.一开始的想法是循环两次，然后发现循环一次就可以了，都在循环内进行加减★