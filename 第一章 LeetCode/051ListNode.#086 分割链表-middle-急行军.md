
### 分隔链表

##### 给你一个链表的头节点 head 和一个特定值 x ，请你对链表进行分隔，使得所有 小于 x 的节点都出现在 大于或等于 x 的节点之前。  
##### 你应当 保留 两个分区中每个节点的初始相对位置。

示例1:

![例](http://120.79.201.10:9000/leetcode_pic/086_01.jpg)

> 输入：head = [1,4,3,2,5,2], x = 3  
  输出：[1,2,2,4,3,5]  

---

思路一: 
1.两个链表存起来, 循环head, 拆除一个个节点放到两个链表中, 最后连接到一起

---

```
var partition = function(head, x) {
    if(!head || !head.next) return head;

    let dummyNode1 = new ListNode(-1)
    let dummyNode2 = new ListNode(-1)
    let dummyNode1Last = dummyNode1
    let dummyNode2Last = dummyNode2

    let curr = head
    let next = head.next

    while(curr) {
        if(curr.val < x) {
            dummyNode1Last.next = curr
            dummyNode1Last = curr
        }else {
            dummyNode2Last.next = curr
            dummyNode2Last = curr
        }
        curr.next = null
        curr = next
        next && (next = next.next)
    }
    dummyNode1Last.next = dummyNode2.next
    return dummyNode1.next
};
```

* 技巧: 无 

* 优化空间: : 无 

* 学习: 无

* 总结: 无
