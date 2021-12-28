
### 227. 基本计算器II

#### 给你一个字符串表达式 s ，请你实现一个基本计算器来计算并返回它的值。
#### 整数除法仅保留整数部分。
     
> 输入：s = "3+2*2"
> 输出：7
     
---

思路
1.栈

---

```
var calculate = function(s) {
    // 利用栈计算,加减的先push进队列, 乘除的拿前一个值计算
    s = s.replaceAll(/\s*/g, '')
    let stack = []
    let preSign = "+"
    let num = 0
    let ans = 0
    for(let i = 0; i < s.length; i++){
        if(!isNaN(+s[i])) {
            num = num * 10 + +s[i]
        }
        if(isNaN(+s[i]) || i === s.length - 1) {
            switch(preSign) {
                case '+':
                    stack.push(num)
                    break;
                case '-':
                    stack.push(-num)
                    break;
                case '*':
                    stack.push(stack.pop() * num)
                    break;
                case '/':
                    stack.push(~~(stack.pop() / num))
                    break;
            }
            preSign = s[i]
            num = 0
        }
    }
    for(let i = 0; i < stack.length; i++){
        ans += stack[i]
    }
    return ans
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
