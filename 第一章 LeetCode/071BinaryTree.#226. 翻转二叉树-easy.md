
### 226. 翻转二叉树

#### 翻转一棵二叉树。
  
```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```

```
     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

---

思路
1.递归

---

```
var invertTree = function(root) {
    if(!root) return root
    let temp = root.left 
    root.left = root.right
    root.right = temp
    root.left && invertTree(root.left)
    root.right && invertTree(root.right)
    return root
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
