
### 844. 比较含退格的字符串

#### 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，请你判断二者是否相等。# 代表退格字符。
#### 如果相等，返回 true ；否则，返回 false 。
  

> 输入：s = "ab#c", t = "ad#c"  
> 输出：true  
> 解释：S 和 T 都会变成 “ac”。  
>
> 输入：s = "ab##", t = "c#d#"  
> 输出：true  
> 解释：s 和 t 都会变成 “”。  

---

思路
1.栈就好

---

```
var backspaceCompare = function(s, t) {
    let r1 = []
    let r2 = []
    for(let i = 0; i < s.length; i++) {
        switch(s[i]) {
            case '#':
                r1.pop()
                break;
            default:
                r1.push(s[i])
                break;
        }
    }
    for(let i = 0; i < t.length; i++) {
        switch(t[i]) {
            case '#':
                r2.pop()
                break;
            default:
                r2.push(t[i])
                break;
        }
    }
    return r1.join('') === r2.join('')
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
