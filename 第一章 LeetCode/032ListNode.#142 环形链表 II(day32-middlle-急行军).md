
### 题目: 环形链表 II
##### 给定一个链表，返回链表开始入环的第一个节点。 如果链表无环，则返回 null。
##### 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 如果 pos 是 -1，则在该链表中没有环。注意，pos 仅仅是用于标识环的情况，并不会作为参数传递到函数中。
       
&nbsp;

![理解图](http://120.79.201.10:9000/leetcode_pic/142_01.jpg)
> 输入：head = [3,2,0,-4], pos = 1  
> 输出：返回索引为 1 的链表节点  
> 解释：链表中有一个环，其尾部连接到第二个节点。  

---
思路一:  
1.while循环,添加tag属性来判断

思路二: (官方解法-实际画图会发现该规律)
1.我们使用两个指针，fast 与 slow。它们起始都位于链表的头部。
随后，slow 指针每次向后移动一个位置，而 fast 指针向后移动两个位置。
如果链表中存在环，则 fast 指针最终将再次与 slow 指针在环中相遇。  
2.相遇之后,会发现"相交点->环点"和"head->环点"的距离是一样
---

&nbsp;

```
// 自己的
var detectCycle = function(head) {
    while(head) {
        if(head.tag) return head
        head.tag = true
        head = head.next
    }
    return null 
};

// 官网的
var detectCycle = function(head) {
    if (head === null) {
        return null;
    }
    let slow = head, fast = head;
    while (fast !== null) {
        slow = slow.next;
        if (fast.next !== null) {
            fast = fast.next.next;
        } else {
            return null;
        }
        if (fast === slow) {
            let ptr = head;
            while (ptr !== slow) {
                ptr = ptr.next;
                slow = slow.next;
            }
            return ptr;
        }
    }
    return null;
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.数学方式巧妙解题

* 总结: 无
