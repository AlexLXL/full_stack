
### 题目: 环形链表
##### 给定一个链表，判断链表中是否有环
##### 如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。 为了表示给定链表中的环，我们使用整数 pos 来表示链表尾连接到链表中的位置（索引从 0 开始）。 
##### 如果 pos 是 -1，则在该链表中没有环。注意：pos 不作为参数进行传递，仅仅是为了标识链表的实际情况。

&nbsp;

![示例图](./img/141_01.jpg)  
> 输入：head = [3,2,0,-4], pos = 1  
  输出：true  
  解释：链表中有一个环，其尾部连接到第二个节点。  
> 输入：head = [1,2], pos = 0  
  输出：true  
  解释：链表中有一个环，其尾部连接到第一个节点。  
> 输入：head = [1], pos = -1  
  输出：false  
  解释：链表中没有环。

---
思路一:  
1.循环依次给val(添加后缀), 当发现有后缀时即闭环
1.添加后缀改为添加属性亦可

思路二:
1.利用JSON.stringify的特性,不能解析闭环对象。try{}catch(){}捕获异常

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
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function(head) {
    while (head) {
        if (head.tag) {
        return true;
        }
        head.tag = true;
        head = head.next;
    }
  return false;
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 
1.巧用js特性,开阔思路
