
### 145. 二叉树的后序遍历

#### 给定一个二叉树，返回它的 后序 遍历

```
输入: [1,null,2,3]  
   1
    \
     2
    /
   3 

输出: [3,2,1]
```
     
---

思路
1.递归

---

```
// leetcode不支持外部定义变量, 所以使用闭包
var postorderTraversal = function(root) { 
    let res = []
    const postOrder = (root) => {
        if (root == null) return;
        postOrder(root.left);
        postOrder(root.right);
        res.push(root.val);
    };
    postOrder(root)
    return res
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
