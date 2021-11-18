
### 题目: Fizz Buzz
##### 给你一个整数 n ，找出从 1 到 n 各个整数的 Fizz Buzz 表示，并用字符串数组 answer（下标从 1 开始）返回结果，其中：

>  answer[i] == "FizzBuzz" 如果 i 同时是 3 和 5 的倍数。  
>  answer[i] == "Fizz" 如果 i 是 3 的倍数。  
>  answer[i] == "Buzz" 如果 i 是 5 的倍数。  
>  answer[i] == i 如果上述条件全不满足。  

> 输入：n = 3  
  输出：["1","2","Fizz"]  
> 输入：n = 5  
  输出：["1","2","Fizz","4","Buzz"] 
      
---

思路一:  
1.判断

---

```
var fizzBuzz = function(n) {
    let result = ["1"]
    for(let i = 1; i < n; i++) {
        let nums = i + 1
        if(nums % 15 === 0) {
            result[i] = 'FizzBuzz'
        }else if(nums % 3 === 0){
            result[i] = 'Fizz'
        }else if(nums % 5 === 0){
            result[i] = 'Buzz'
        }else {
            result[i] = nums.toString()
        }
    }
    return result
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 无
