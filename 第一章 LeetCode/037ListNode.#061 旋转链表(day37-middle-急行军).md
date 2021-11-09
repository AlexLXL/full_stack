
### 题目: 旋转链表
##### 给你一个链表的头节点 head ，旋转链表，将链表每个节点向右移动 k 个位置。

&nbsp;

![理解图](./img/061_01.jpg)
> 输入：head = [1,2,3,4,5], k = 2  
  输出：[4,5,1,2,3]

---

思路一:  
1.变成环, 然后往后推几格就好

---

```
/**
 * 思路一:
 */
var rotateRight = function(head, k) {
    if(!head) return head
    let curr = head
    let len = 1
    while(curr.next) {
        curr = curr.next
        len++
    }
    curr.next = head
    for(let i = 0; i < (len - (k % len) - 1); i++) {
        head = head.next
    }
    let temp = head.next
    head.next = null
    return temp
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无  

* 总结: 无
