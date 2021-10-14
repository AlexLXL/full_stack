
### 题目: 验证回文串
##### 给定一个字符串，验证它是否是回文串，只考虑字母和数字字符，可以忽略字母的大小写。
    
> 输入: "A man, a plan, a canal: Panama"  
> 输出: true  
> 解释："amanaplanacanalpanama" 是回文串  
>
> 输入: "race a car"  
> 输出: false  
> 解释："raceacar" 不是回文串  

&nbsp;

---
思路一: 剔除非字母和数字的,双指针循环比较  
* 执行用时：84 ms, 在所有 JavaScript 提交中击败了61.96%的用户  
* 内存消耗：41.3 MB, 在所有 JavaScript 提交中击败了46.82%的用户

思路二: 同上(性能无太大提升)  
1.replace改为match(replace会不断循环修改内存的空位)  
2.for改成while, 更容易看懂  
---

&nbsp;

```
/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    s = s.replace(/[^a-zA-Z0-9]/g, "")
    let len = s.length
    for(let i = 0, j = len - 1; i < j; i++,j--) {
        if(s[i].toLowerCase() !== s[j].toLowerCase()) {
            return false
        }
    }
    return true
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.string使用replace来剔除一些值，也可以考虑使用match来提取需要的值★★  
2.有时候while比for循环代码要好看

* 总结: 无
