
### 589. N 叉树的前序遍历

#### 给定一个 N 叉树，返回其节点值的 前序遍历 。
  
![](http://120.79.201.10:9000/leetcode_pic/589_01.png)
> 输入：root = [1,null,3,2,4,null,5,6]
  输出：[1,3,5,6,2,4]  

![](http://120.79.201.10:9000/leetcode_pic/589_02.png) 
> 输入：root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
  输出：[1,2,3,6,7,11,14,4,8,12,5,9,13,10]

---

思路
1.递归本身就是前序遍历

---

```
var preorder = function(root) {
    let ans = []
    let preOrderTraverse = function(root) {
        if(!root) return
        ans.push(root.val)
        root.children.forEach(item => {
            preOrderTraverse(item)
        })
    }
    preOrderTraverse(root)
    return ans
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
