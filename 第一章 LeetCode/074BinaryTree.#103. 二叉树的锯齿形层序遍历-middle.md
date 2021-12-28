
### 103. 二叉树的锯齿形层序遍历

#### 给定一个二叉树，返回其节点值的锯齿形层序遍历。（即先从左往右，再从右往左进行下一层遍历，以此类推，层与层之间交替进行）。

> 给定二叉树 [3,9,20,null,null,15,7],
```
    3
   / \
  9  20
    /  \
   15   7
```
> 返回锯齿形层序遍历如下：
```
[
  [3],
  [20,9],
  [15,7]
]
```

---

思路
1.广度优先搜索(后进前出)

---

```
var zigzagLevelOrder = function(root) {
    if(!root) return []
    let result = []
    let queue = [[root]]
    let preOrderTraverse = true
    while(queue.length) {
        let temp1 = []
        let temp2 = []
        let nodes = queue.pop()
        nodes.forEach(item => {
            preOrderTraverse ? temp1.push(item.val) : temp1.unshift(item.val)
            item.left && temp2.push(item.left)
            item.right && temp2.push(item.right)
        })
        preOrderTraverse = !preOrderTraverse
        result.push(temp1)
        temp2.length && queue.push(temp2)
    }
    return result
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
