
### 144. 二叉树的前序遍历

#### 给你二叉树的根节点 root ，返回它节点值的 前序 遍历。
     
> 输入：root = [1,null,2,3]
> 输出：[1,2,3]

> 输入：root = []
> 输出：[]
     
---

思路一:
1.递归

思路二:
2.迭代器

---

```
var preorderTraversal = function(root) {
    if(!root) return []
    let ans = []
    function preorderTraversal(root) {
        ans.push(root.val)
        root.left && preorderTraversal(root.left)
        root.right && preorderTraversal(root.right)
    }
    preorderTraversal(root)
    return ans
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
