
### 题目: 删除链表中的节点

> 输入：head = [4,5,1,9], node = 5  
> 输出：[4,1,9]  
> 解释：给定你链表中值为 5 的第二个节点，那么在调用了你的函数之后，该链表应变为 4 -> 1 -> 9.  
>
> 输入：head = [4,5,1,9], node = 1  
> 输出：[4,5,9]  
> 解释：给定你链表中值为 1 的第三个节点，那么在调用了你的函数之后，该链表应变为 4 -> 5 -> 9.  

```
// Node的结构已定义
function ListNode(val) {
    this.val = val;
    this.next = null;
}
```

---
思路一:  
1.换一种思路，删当前 = 后一个往前移 + 删后一个
* 执行用时：80 ms, 在所有 JavaScript 提交中击败了52.82%的用户
* 内存消耗：39.6 MB, 在所有 JavaScript 提交中击败了54.47%的用户
---

&nbsp;

```
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} node
 * @return {void} Do not return anything, modify node in-place instead.
 */
var deleteNode = function(node) {
    node.val = node.next.val
    node.next = node.next.next
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 无
