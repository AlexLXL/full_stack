
### 题目: 两个数组的交集 II

> 输入: [9, 4, 9, 5], [9, 4, 1, 4, 9]  
> 输出: [ 9, 4, 9 ]  
> 输出结果的顺序可以不定

```
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 * 思路一: 最后拿到的值是两个数组相同的值
 *  1.需要两次循环
 *  2.内层循环中判断是否与外层循环值相等
 *  3.相等即push到新数组,num2内交换位置（降低空间复杂度）
 *  4.下次内层循环次数-1
 * 
 * 执行用时：72 ms, 在所有 JavaScript 提交中击败了82.79%的用户
 * 内存消耗：38.3 MB, 在所有 JavaScript 提交中击败了98.45%的用户
 */
var intersect = function(nums1, nums2) {
    let result = []
    let l2 = nums2.length
    for (let i = 0; i < nums1.length; i++) {
        for(let j = 0; j < l2 - result.length; j++) {
            if(nums2[j] === nums1[i]) {
                swap(nums2, j, l2 - result.length - 1)
                result.push(nums1[i])
                break
            }
        }
    }
    return result
};

function swap(num, i, j) {
    num[i] ^= num[j]
    num[j] ^= num[i]
    num[i] ^= num[j]
}
```

* 技巧: 双指针、hashmap、(二分查找、排序)

* 优化空间:  
> 1.如果给定的数组已经排好序呢？你将如何优化你的算法？  答: 二分法  
> 2.如果 nums1 的大小比 nums2 小很多，哪种方法更优？  答: nums2作为外层循环  
> 3.如果 nums2 的元素存储在磁盘上，内存是有限的，
> 并且你不能一次加载所有的元素到内存中，你该怎么办？ 答: 使用外部排序  

* 学习:  
1.通过hashmap来减少循环嵌套是一种思路★★
![理解图](./img/350_01.gif)
但性能并不好(相比思路一),不知道是不是内存寻址慢问题

* 总结:  
1.归结到#026第2条:充分利用数组空间,降低空间复杂度
