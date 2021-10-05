
### 题目: 两数之和
##### 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 target  的那 两个 整数，并返回它们的数组下标。
##### 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素在答案里不能重复出现。

> 输入：nums = [2,7,11,15], target = 9  
  输出：[0,1]  
>输入：nums = [3,2,4], target = 6  
 输出：[1,2]  
>输入：nums = [3,3], target = 6  
 输出：[0,1  

```
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 执行用时：68 ms, 在所有 JavaScript 提交中击败了92.22%的用户
 * 内存消耗：39.8 MB, 在所有 JavaScript 提交中击败了39.68%的用户
 */
var twoSum = function(nums, target) {
    let hash = {}
    for(let i = 0; i < nums.length; i++) {
        let prop = nums[i]
        if (hash.hasOwnProperty(prop)) {
            if(hash[prop] !== i) {
                return [hash[prop], i]
            }
        }else {
            hash[target - prop] = i
        }
    }
};
```

* 技巧: 
1.通过对象key存储差值,index储存下标★

* 优化空间: 无

* 学习: 
1. 多解: 对象(即哈希表)、Map、Set均可以解决该题  
1)对象 执行时间和内存消耗 都还能接受(68ms)  
2)Map 执行时间 会稍慢(对比对象100ms)  
3)Set 执行时间 持平(68ms),
(但由于set不能存储相同对象,会导致在解题时需要两个Set,空间复杂度一下子就高了)

* 总结: 


