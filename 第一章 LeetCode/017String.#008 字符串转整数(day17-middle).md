
### 题目: 字符串转证书
##### 给定一个字符串转为整数，需满足下面条件
1. 如果不是+、-、数字开头即为0
2. 结果需在[-2^31, 2^31 - 1]范围内,超出返回-2^31或2^31 - 1
    
> 输入：s = "42"  
> 输出：42  
> 输入：s = "   -42"  
> 输出：-42  
> 输入：s = "4193 with words"  
> 输出：4193  
> 输入：s = "words and 987"  
> 输出：0  
> 输入：s = "-91283472332"  
> 输出：-2147483648

&nbsp;

---
思路一:  
1.循环抽取值

思路二:  
1.使用正则(性能也不错)
* 执行用时：76 ms, 在所有 JavaScript 提交中击败了94.41%的用户
* 内存消耗：40.84 MB, 在所有 JavaScript 提交中击败了42.79%的用户
---

&nbsp;

```
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    let min = Math.pow(-2, 31)
    let max = Math.pow(2, 31) - 1
    let matching = s.trim().match(/[-+]?\d+/)
    // ['4193', index: 0, input: '4193 with words', groups: undefined]
    let num = matching ? matching[0] : 0
    let idx = matching ? matching.index : null
    if(idx === 0 && num !== "") {
        if(num < min) {
            return min
        }else if(num > max) {
            return max
        }else {
            return +num
        }
    }else {
        return 0
    }
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.string.match(regExp), 正则不加g默认只返回第一项

* 总结: 无
