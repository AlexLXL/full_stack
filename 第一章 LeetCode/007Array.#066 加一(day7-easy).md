
### 题目: 加一

> 输入：digits = [1,2,3]  
> 输出：[1,2,4]
>
> 输入：digits = [9]  
> 输出：[1, 0]

```
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne = function(digits) {
    // 思路二: 添加指针
    let r = digits.length - 1
    for(let i = r, j = r; i >= 0; i--) {
        let currentValue = digits[i] + 1
        if(currentValue === 10) {
            digits[i] = 0
            if(!j) {
               digits[j] = 1
               digits.push(0)
               break
            }
            j--
        }else {
            digits[i] = currentValue
            break
        }
    }
    return digits
};
```

* 技巧:  
1.数学进一位

* 优化空间:  无

* 学习:  无


* 总结:  
★1.尝试了两种解法:  
第一种执行用时超80%、内存消耗超79%  
第一种执行用时超93%、内存消耗超61%  
算法就是这样很多时候想要更快的速度就要消耗更多内存,在实际场景中应该根据需要做解法调整
★★2.unshift性能并不优,能改成push方案最好  
3.看别人代码启发，以后可以多尝试使用三点运算符[1, ...digits]

