
### 题目: 合并两个有序链表
##### 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 

> 输入：l1 = [1,2,4], l2 = [1,3,4]  
> 输出：[1,1,2,3,4,4]  
> 输入：l1 = [], l2 = []  
> 输出：[]  
> 输入：l1 = [], l2 = [0]  
> 输出：[0]  

---
思路一:  
1.按照数据结构与算法的,使用一个循环慢慢拿出最小值，时间复杂度O(n + m),空间复杂度O(1)

思路二:
1.使用递归,每次传入的链表其中一个为l1.next 或 l2.next链表,递归循环
时间复杂度O(n + m),空间复杂度O(n + m)
---

&nbsp;

```
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
    const prehead = new ListNode(-1);

    let prev = prehead;
    while (l1 != null && l2 != null) {
        if (l1.val <= l2.val) {
            prev.next = l1;
            l1 = l1.next;
        } else {
            prev.next = l2;
            l2 = l2.next;
        }
        prev = prev.next;
    }

    prev.next = l1 === null ? l2 : l1;

    return prehead.next;
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 
1.再循环中把判断null的条件放最外层,不然内层不好做操作
