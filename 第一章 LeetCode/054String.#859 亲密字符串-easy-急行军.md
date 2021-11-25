
### 亲密字符串

#### 给你两个字符串 s 和 goal ，只要我们可以通过交换 s 中的两个字母得到与 goal 相等的结果，就返回 true ；否则返回 false 。

> 输入：s = "ab", goal = "ba"  
  输出：true  
  解释：你可以交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 相等。  
> 
> 输入：s = "ab", goal = "ab"  
  输出：false  
  解释：你只能交换 s[0] = 'a' 和 s[1] = 'b' 生成 "ba"，此时 s 和 goal 不相等。  
> 
> 输入：s = "aa", goal = "aa"  
  输出：true  
  解释：你可以交换 s[0] = 'a' 和 s[1] = 'a' 生成 "aa"，此时 s 和 goal 相等。  
> 
> 输入：s = "aaaaaaabc", goal = "aaaaaaacb"  
  输出：true  

---

思路一: 
1.循环, 拿到两个不同的下标, 交换值判断是否相等
2.在循环的时候, 顺带判断是否有相同元素, 有相同元素且s === goal, 则为true

优化: 第2点可以使用无符号16位数组统计, 第1点的可以省略 `交换值` 这一步, 直接用下标判断两值是不是交叉相等

---

```
var buddyStrings = function(s, goal) {
    if (s.length != goal.length) {
        return false;
    }
    
    if (s === goal) {
        const count = new Array(26).fill(0);
        for (let i = 0; i < s.length; i++) {
            count[s[i].charCodeAt() - 'a'.charCodeAt()]++;
            if (count[s[i].charCodeAt() - 'a'.charCodeAt()] > 1) {
                return true;
            }
        }
        return false;
    } else {
        let first = -1, second = -1;
        for (let i = 0; i < s.length; i++) {
            if (s[i] !== goal[i]) {
                if (first === -1)
                    first = i;
                else if (second === -1)
                    second = i;
                else
                    return false;
            }
        }

        return (second !== -1 && s[first] === goal[second] && s[second] === goal[first]);
    }
};

```

* 技巧: 无 

* 优化空间: : 无 

* 学习: 
1.合理利用小写字母统计的优化速度
2.有些时候判断不一定非要拿结果，可以判断小条件就好了

* 总结: 无
