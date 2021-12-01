
### 题目: 剑指 Offer 53 - II. 0～n-1中缺失的数字

##### 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。
      
> 输入: [0,1,3]  
  输出: 2  
> 输入: [0,1,2,3,4,5,6,7,9]  
  输出: 8  

---

思路一: 
1.二分查找(左右中+while)

---

```
// 思路一
var missingNumber = function(nums) {
    if(nums.length === 1) return (nums[0] ^ 1)
    let l = 0,
        r = nums.length - 1,
        m
    while(l <= r) {
        m = Math.floor((l + r) / 2)
        if(nums[m] === m){
            l = m + 1
        }else {
            r = m - 1
        }
    }
    return l
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
