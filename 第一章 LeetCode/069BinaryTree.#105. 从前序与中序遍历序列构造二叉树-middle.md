
### 105. 从前序与中序遍历序列构造二叉树

#### 给定一棵树的前序遍历 preorder 与中序遍历  inorder。请构造二叉树并返回其根节点。
  
![](http://120.79.201.10:9000/leetcode_pic/105_01.jpg)

> Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]  
  Output: [3,9,20,null,null,15,7]  
>  
> Input: preorder = [-1], inorder = [-1]  
  Output: [-1]   

---

思路
1.把树的生成看成一个个根节点的生成(递归的思想)

优化:
- slice的优化, 使用双指针
- indexOf使用改hashMap, 空间换时间

- https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/solution/ding-wei-chu-gen-jie-dian-de-wei-zhi-hua-fen-zuo-y/

---

```
const buildTree = (preorder, inorder) => {
  if (inorder.length == 0) return null;
  const root = new TreeNode(preorder[0]);
  const mid = inorder.indexOf(preorder[0]);
  root.left = buildTree(preorder.slice(1, mid + 1), inorder.slice(0, mid));
  root.right = buildTree(preorder.slice(mid + 1), inorder.slice(mid + 1));
  return root;
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
