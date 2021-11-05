
# ============题目含义过于模糊============
### 没有说清楚究竟是想要怎样的值，用bfs写了一个接近的就不知道想怎样了

### 题目: 将有序数组转换为二叉搜索树
##### 给你一个整数数组 nums ，其中元素已经按 升序 排列，请你将其转换为一棵 高度平衡 二叉搜索树。
##### 高度平衡 二叉树是一棵满足「每个节点的左右两个子树的高度差的绝对值不超过 1 」的二叉树。
      
&nbsp;

![理解图](./img/108_01.jpg)
> 输入：nums = [-10,-3,0,5,9]  
> 输出：[0,-3,9,-10,null,5]  
> 解释：[0,-10,5,null,-3,null,9] 也将被视为正确答案：  
![理解图](./img/108_02.jpg)


---
思路一:  
1.BFS
---

&nbsp;

```
// 自己的
// var sortedArrayToBST = function(nums) {
//     let pivot = Math.floor((nums.length - 1) / 2)
//     let tree = new TreeNode(nums[pivot], 
//         genTree(nums.slice(0, pivot)),
//         genTree(nums.slice(pivot + 1,))
//     )
//     return tree
// };

// function genTree(arr) {
//     let len = arr.length
//     let pivot = Math.floor((len - 1) / 2)
//     if(len === 0) return undefined
//     let tree = new TreeNode(arr[pivot], 
//         genTree(arr.slice(0, pivot)),
//         genTree(arr.slice(pivot + 1,))
//     )
//     return tree
// }

// 别人的
const buildBST = (nums, start, end) => {
    if (start > end) { // 构成不了区间，返回null
      return null;
    }

    const midIndex = (start + end) >>> 1; // 求中间索引
    const root = new TreeNode(nums[midIndex]); // 构建当前节点

    root.left = buildBST(nums, start, midIndex - 1); // 构建左子树
    root.right = buildBST(nums, midIndex + 1, end); // 构建右子树

    return root;
};

var sortedArrayToBST = function(nums) {
    return buildBST(nums, 0, nums.length - 1); // 递归的入口
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  

* 总结:  
