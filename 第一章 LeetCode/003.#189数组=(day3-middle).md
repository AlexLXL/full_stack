
### 题目: 旋转数组
> 输入: nums = [1,2,3,4,5,6,7], k = 3  
> 输出: [5,6,7,1,2,3,4]  
> 解释:  
> 向右旋转 1 步: [7,1,2,3,4,5,6]  
> 向右旋转 2 步: [6,7,1,2,3,4,5]  
> 向右旋转 3 步: [5,6,7,1,2,3,4]  
 


```
/**
 * 将数组进行反转，然后再反转左右两边的数组
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var reverse = function(nums, start, end) {
    for(let i = start; i <= end; i++) {
        if (start === end) return
        nums[start] ^= nums[end]
        nums[end] ^= nums[start]
        nums[start] ^= nums[end]
        start++
        end--
    }
}
var rotate = function(nums, k) {
    k %= nums.length;
    reverse(nums, 0, nums.length - 1)
    reverse(nums, 0, k - 1)
    reverse(nums, k, nums.length - 1)
};
```

* 技巧: 无

* 学习: 无

* 总结:   
1.使用for循环会while快
