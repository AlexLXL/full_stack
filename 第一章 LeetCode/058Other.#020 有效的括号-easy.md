
### 题目: 有效的括号

##### 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。

> 输入：s = "()"  
  输出：true  
>  
> 输入：s = "()[]{}"  
  输出：true  
>
> 输入：s = "(]"  
  输出：false  
>
> 输入：s = "([)]"  
  输出：false  

---

思路一: 
1.栈存储, 然后匹配删除即可

---

```
var isValid = function(s) {
    if(s.length & 1) return false
    let match = {
        '(': ')',
        '[': ']',
        '{': '}',
    }
    let stack = []
    for(let i = 0; i < s.length; i++) {
        if(['(', '[', '{'].includes(s[i])) {
            stack.push(s[i])
        }else {
            let value = stack.pop()
            if(match[value] !== s[i]) {
                return false
            }
        }
    }
    if(!stack.length) {
        return true
    }else {
        return false
    }
};
```

* 技巧: 无 

* 优化空间: 
1. 长度为奇数直接返回false
2.使用map存储

* 学习: 无

* 总结: 无
