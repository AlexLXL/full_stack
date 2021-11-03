
### 题目: 对称二叉树
##### 给定一个二叉树，检查它是否是镜像对称的。

&nbsp;
```
    1
   / \
  2   2
 / \ / \
3  4 4  3
```
> 二叉树 [1,2,2,3,4,4,3] 是对称的。  

```
    1
   / \
  2   2
   \   \
   3    3
```
>  [1,2,2,null,3,null,3] 则不是镜像对称的: 

---
思路一:  
1.使用生成器生成左右数组，对比数组【左边先迭代left,右边先迭代right】

思路二:
1.同一的思路，使用队列存储同level的值进行对比，通过while迭代

思路三: 
1.循环不变式(性能最优)
 * 节点值相等
 * node1的左子树和node2的右子树是镜像
 * node1的右子树和node2的左子树是镜像
---

&nbsp;

```
var isSymmetric = function(root) {
    if (!root) return true;
    return check(root.left, root.right)
};
/**
 * 循环不变式
 * 节点值相等
 * node1的左子树和node2的右子树是镜像
 * node1的右子树和node2的左子树是镜像
 */
 function check(node1, node2) {
     if(!node1 && !node2) return true;
     if(!node1 || !node2) return false;
     return (node1.val === node2.val) && check(node1.left, node2.right) && check(node1.right, node2.left)
 }
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.生成器的速度和空间都并不优
2.学会使用广度优先搜索（使用队列+while，前推前取）
3.递归的循环不变式还是欠缺

* 总结:  
