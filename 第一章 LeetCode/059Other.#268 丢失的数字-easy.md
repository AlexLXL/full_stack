
### 题目: 丢失的数字

##### 给定一个包含 [0, n] 中 n 个数的数组 nums ，找出 [0, n] 这个范围内没有出现在数组中的那个数。

> 输入：nums = [3,0,1]  
  输出：2  
  解释：n = 3，因为有 3 个数字，所以所有的数字都在范围 [0,3] 内。2 是丢失的数字，因为它没有出现在 nums 中。
>  
> 输入：nums = [0,1]  
  输出：2  
  解释：n = 2，因为有 2 个数字，所以所有的数字都在范围 [0,2] 内。2 是丢失的数字，因为它没有出现在 nums 中。
>
> 输入：nums = [9,6,4,2,3,5,7,0,1]  
  输出：8  
  解释：n = 9，因为有 9 个数字，所以所有的数字都在范围 [0,9] 内。8 是丢失的数字，因为它没有出现在 nums 中。
>
> 输入：nums = [0]  
  输出：1  
  解释：n = 1，因为有 1 个数字，所以所有的数字都在范围 [0,1] 内。1 是丢失的数字，因为它没有出现在 nums 中。

---

思路一: 
1.新建一个数组, 长度nums.length + 1, 统计即可

思路二: 
1. 排序, 循环看是否一一对应

思路三:
位运算(略过)

思路四:
数学(略过)

---

```
// 思路一
var missingNumber = function(nums) {
    let arr = Array(nums.length + 1).fill(0)
    nums.forEach(item => {
        arr[item]++
    })
    for(let i = 0; i < arr.length; i++){
        if(arr[i] === 0) return i
    }
};

// 思路二
var missingNumber = function(nums) {
    nums.sort((a, b) => a - b);
    const n = nums.length;
    for (let i = 0; i < n; i++) {
        if (nums[i] !== i) {
            return i;
        }
    }
    return n;
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
