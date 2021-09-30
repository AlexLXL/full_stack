
### 题目: 删除有序数组中的重复项
> 例子:   
> 输入：nums = [0,0,1,1,1,2,2,3,3,4]  
> 输出：5, nums = [0,1,2,3,4]

```
let removeDuplicates = function(nums) {
    let n = nums.length
    if(n === 0) { return 0 }
    let slow = fast = 1
    while(fast < n) {
        if(nums[fast] !== nums[fast - 1]) {
            nums[slow] = nums[fast]
            ++slow
        }
        ++fast
    }
    nums.splice(slow, (n - slow -1))
    return slow
};
```

&nbsp;

* 技巧: &nbsp;双指针    

* 学习: 无

* 总结:   
1.添加边界判断能提高性能  
2.数组长度变短的需求,通过交换位置充分利用该数组空间,而不需另外开辟空间★★(#026 / #350)
