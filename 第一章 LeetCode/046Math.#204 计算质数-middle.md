
### 题目: 计数质数
##### 统计所有小于非负整数 n 的质数的数量。
>  输入：n = 10  
   输出：4  
   解释：小于 10 的质数一共有 4 个, 它们是 2, 3, 5, 7 。

> 输入：n = 0  
  输出：0  

> 输入：n = 1  
  输出：0  
      
---

思路一:   
1.枚举数组  
2.拿到第一个值v, 循环后面的, 删除能被v整除的(这个过程十分耗性能, 循环次数多, 数组在内存被重构)

思路二:  
1.利用数学知识, 判断是否质数的时候, 循环范围在[2, 根号n)就好


思路三:  
整合上面思路, 就是埃氏筛
1.生成一个长度n的数组isPrime, 填充1
2.外循环, 如果isPrime的值为1就count++
3.内循环, 利用[2, 根号n), 将后面的isPrime[j] = 0

思路四:
思路三减少重复, 就是线性筛
1.生成一个长度n的数组isPrime, 填充1
2.生成一个保存结果的数组 (result = [])
3.循环A, isPrime的值为1就加到result
4.循环A嵌套循环B, 根据result的值和当前isPrime[i], 往后标记isPrime数组
![示例图](http://120.79.201.10:9000/leetcode_pic/204_01.jpg)  

---

```
思路三:
var countPrimes = function(n) {
    const isPrime = new Array(n).fill(1);
    let ans = 0;
    for (let i = 2; i < n; ++i) {
        if (isPrime[i]) {
            ans += 1;
            for (let j = i * i; j < n; j += i) {
                isPrime[j] = 0;
            }
        }
    }
    return ans;
};


// 思路四
var countPrimes = function(n) {
    const isPrime = new Array(n).fill(1);
    const primes = [];
    for (let i = 2; i < n; ++i) {
        if (isPrime[i]) {
            primes.push(i);
        }
        for (let j = 0; j < primes.length && i * primes[j] < n; ++j) {
            isPrime[i * primes[j]] = 0;
            if (i % primes[j] === 0) {
                break;
            }
        }
    }
    return primes.length;
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 无
