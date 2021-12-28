
### 剑指 Offer 32 - II. 从上到下打印二叉树 II

#### 从上到下按层打印二叉树，同一层的节点按从左到右的顺序打印，每一层打印到一行。
  
> 给定二叉树: [3,9,20,null,null,15,7],
```
     4
   /   \
  2     7
 / \   / \
1   3 6   9
```
> 返回其层次遍历结果：
```
[
  [3],
  [9,20],
  [15,7]
]
```

---

思路
1.广度优先搜索(后进前出)

---

```
var levelOrder = function(root) {
    if(!root) return []
    let arr = [[root]]
    let ans = []
    while(arr.length) {
        let nodes = arr.pop()
        ans.push(nodes.map(item => item.val))
        let temp = []
        nodes.forEach(item => {
            item.left && temp.push(item.left)
            item.right && temp.push(item.right)
        })
        temp.length && arr.push(temp)
        
    }
    return ans
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
