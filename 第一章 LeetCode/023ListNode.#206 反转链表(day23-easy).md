
### 题目: 反转链表
##### 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

> 输入：head = [1,2,3,4,5]  
  输出：[5,4,3,2,1]  
> 输入：head = [1,2]  
  输出：[2,1]  
> 输入：head = []  
  输出：[]  

---
思路一:  
1.使用三个指针prev、curr、next

思路二: 
1.使用二个指针prev、curr, next作为局部变量保存(减少空间复杂度,但因为内存的开辟销毁,会影响效率)
---

&nbsp;

```
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function(head) {
    let prev = null
    let curr = head
    let next = null
    while(curr) {
        next = curr.next
        curr.next = prev
        prev = curr
        curr = next
    }
    return prev
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 
1.循环里定义局部变量确实可以减少空间复杂度,但这个变量的内存空间开辟和销毁会增加一些时间开销★★