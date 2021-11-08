
### 题目: 合并两个有序数组
##### 给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n ，分别表示 nums1 和 nums2 中的元素数目。
##### 请你 合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。
      
&nbsp;

> 输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3  
> 输出：[1,2,2,3,5,6]  
> 解释：需要合并 [1,2,3] 和 [2,5,6] 。  
> 合并结果是 [1,2,2,3,5,6] ，其中斜体加粗标注的为 nums1 中的元素。
  

---
思路一:  
1.while循环,双指针,从后面开始

思路二:
1.将数组二进行三点运算加到数组一，对数组一排序

---

&nbsp;

```
var merge = function(nums1, m, nums2, n) {
    let idx1 = m - 1
    let idx2 = n -1
    let tail = idx1 + idx2 + 1
    while(idx1 >= 0 || idx2 >= 0) {
        if(idx1 === -1) {
            nums1[tail--] = nums2[idx2--]
            continue;
        }
        if(idx2 === -1) {
            nums1[tail--] = nums1[idx1--]
            continue;
        }
        if(nums1[idx1] >= nums2[idx2]) {
            nums1[tail--] = nums1[idx1--]
        }else {
            nums1[tail--] = nums2[idx2--]
        }
    }
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无  

* 总结: 无
