
### 题目: 二叉树的层序遍历
##### 给你一个二叉树，请你返回其按 层序遍历 得到的节点值。 （即逐层地，从左到右访问所有节点）

&nbsp;

> 二叉树：[3,9,20,null,null,15,7],  
```
    3
   / \
  9  20
    /  \
   15   7
```
>  返回其层序遍历结果：
```
[
  [3],
  [9,20],
  [15,7]
]
```

---
思路一:  
1.广度优先搜索, 过程中给node添加level, while循环的时候添加到result

思路二:
2.修改的广度优先搜索,在while中添加for循环,取出所有值，然后添加下一level的值

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
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
    if(root === null) return []
    root.id = 0
    let queue = [root]
    let result = []
    while(queue.length) {
        let node = queue.shift()
        result[node.id] ? result[node.id].push(node.val) : (result[node.id] = [node.val])
        node.left && (node.left.id = node.id + 1) && queue.push(node.left)
        node.right && (node.right.id = node.id + 1) && queue.push(node.right)
    }
    return result
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.使用广度优先搜索进行层级判断★

* 总结:  
