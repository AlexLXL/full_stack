
### 107. 二叉树的层序遍历 II

#### 给定一个二叉树，返回其节点值自底向上的层序遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历）
  
> 给定二叉树 [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
> 返回其自底向上的层序遍历为：
```
[
  [15,7],
  [9,20],
  [3]
]
```

---

思路
1.广度优先搜索(后进前出)
2.最后反转结果

---

```
var levelOrderBottom = function(root) {
    if(!root) return []

    let queue = [[root]]
    let result = []
    while(queue.length) {
        let temp1 = []
        let temp2 = []
        let nodes = queue.pop()
        nodes.forEach(item => {
            temp1.push(item.val)
            item.left && temp2.push(item.left)
            item.right && temp2.push(item.right)
        })
        temp2.length && queue.push(temp2)
        result.push(temp1)
    }
    return result.reverse()
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
