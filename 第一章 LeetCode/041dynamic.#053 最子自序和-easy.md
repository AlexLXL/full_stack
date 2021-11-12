
### 题目: 最大子序和
##### 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
     

> 输入：nums = [-2,1,-3,4,-1,2,1,-5,4]  
  输出：6  
  解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。  
> 输入：nums = [0]  
  输出：0  
> 输入：nums = [-1]  
  输出：-1

---

思路一: 动态规划   
列举前几项  
1，确定状态  
```
    dp数组存每一项的最大结果: dp[]  
```
2，找到转移公式  
```
    max = { dp[0] = nums[0]                         i = 0 }  
            dp[n] = Math.max(dp[n-1], 0) + nums[n]  i = n   
```
3，确定初始条件和边界条件  
```
    i = 0 时, 代码赋值  
```
4，计算结果。  
5，优化  
```
     用数组dp存会浪费内存空间,因为前面的值是没意义的,改成两个变量即可  
```

思路二: 分治(官)  
// --snip--

---

```
var maxSubArray = function(nums) {
    let len = nums.length
    let curr = nums[0]
    let max = nums[0]
    for(let i = 1; i < len; i++) {
        curr = Math.max(curr, 0) + nums[i]
        max = Math.max(max, curr)
    }
    return max
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
动态规划的解题步骤!!

* 总结: 无
