
### 题目: 3的幂

##### 给定一个整数，写一个函数来判断它是否是 3 的幂次方。如果是，返回 true ；否则，返回 false 。
##### 整数 n 是 3 的幂次方需满足：存在整数 x 使得 n == 3x
      

>  输入：n = 27
   输出：true

> 输入：n = 0
  输出：false

> 输入：n = 9
  输出：true
      
---

思路一:   
1.循环除或循环乘，然后判断

思路二:
1.因为n有最大值，所以可以用最大值取余

---

```
var isPowerOfThree = function(n) {
        return (n > 0 && 1162261467 % n == 0);
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 无
