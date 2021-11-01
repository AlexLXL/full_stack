
### 题目: 二叉树的最大深度

&nbsp;

```
    3
   / \
  9  20
    /  \
   15   7
```
> 给定二叉树 [3,9,20,null,null,15,7]  
> 返回它的最大深度 3 。


---
思路一:  
1.递归(天生的深度优先算法)

---

&nbsp;

```
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

var maxDepth = function(root) {
    return root==null? 0 : Math.max(maxDepth(root.left), maxDepth(root.right))+1;
};

// 理解版
// var maxDepth = function(root) {
//     if(!root) {
//         return 0;
//     } else {
//         const left = maxDepth(root.left);
//         const right = maxDepth(root.right);
//         return Math.max(left, right) + 1;
//     }
// };
```

* 技巧: 无 

* 优化空间: 无

* 学习: 
1.递归计算层数的时候从下往上累加！！★（从上往下需要全局变量,但leetcode提交全局变量会有问题）

* 总结: 
