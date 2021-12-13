
### 1249. 移除无效的括号

#### 给你一个由 '('、')' 和小写字母组成的字符串 s。
#### 你需要从字符串中删除最少数目的 '(' 或者 ')' （可以删除任意位置的括号)，使得剩下的「括号字符串」有效。
#### 请返回任意一个合法字符串。
  

> 输入：s = "lee(t(c)o)de)"  
  输出："lee(t(c)o)de"  
  解释："lee(t(co)de)" , "lee(t(c)ode)" 也是一个可行答案。  
>
> 输入：s = "))(("  
  输出：""  
  解释：空字符串也是有效的  

---

思路
1.栈

---

```
var minRemoveToMakeValid = function(s) {
    // 记录需要删除的多余括号的索引
    // leftDel, rightDel分别存放'(', ')'
    const n = s.length,
          leftDel = [],
          rightDel = [];
    for (let i = 0; i < n; i++) {
        const char = s[i];
        if (char === '(') {
            leftDel.push(i);
        } else if (char === ')') {
            // 如果有对应的'(', 从删除列表中移除
            // 否则')'是多余的，加入右括号的删除列表
            if (leftDel.length > 0) {
                leftDel.pop();
            } else {
                rightDel.push(i);
            }
        }
    }
    // 根据记录删除
    const res = [...s],
          filter = leftDel.concat(rightDel),
          l = filter.length;
    for (let i = 0; i < l; i++) {
        res[filter[i]] = '';
    }
    return res.join('');
};

```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
