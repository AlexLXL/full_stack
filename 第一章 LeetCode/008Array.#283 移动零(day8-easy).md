
### 题目: 移动零
##### 给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

> 输入: [0,1,0,3,12]  
> 输出: [1,3,12,0,0]
>
> 注意:  
> 1.必须在原数组上操作，不能拷贝额外的数组。  
> 2.尽量减少操作次数。

```
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    for(let i = 0, j = 1; j < nums.length; j++) {
        if(!nums[i] && nums[j]) {
            nums[i] ^= nums[j]
            nums[j] ^= nums[i]
            nums[i] ^= nums[j]
            i++
        }else if(!nums[i] && !nums[j]) {
            // --snip--
        }else {
            i++
        }
        
    }
    return nums
};
```

* 技巧:  
1.快慢双指针

* 优化空间:  无

* 学习:  
1.双指针使用定义(fast和low; lo和hi、p和q)

* 总结:  
1.LeetCode测试环境运行不稳定，执行时间和空间都很慢，自己要对复杂度心里有数
2.★变量的定义可以尝试写在函数参数里(更加简洁)

