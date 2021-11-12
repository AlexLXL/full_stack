
### 题目: 删除链表的倒数第 n 个节点
##### 给定一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点。

> 输入：head = [1,2,3,4,5], n = 2  
  输出：[1,2,3,5]  
> 输入：head = [1], n = 1  
  输出：[]  
> 输入：head = [1,2], n = 1  
  输出：[1]

```
// Node的结构已定义
function ListNode(val) {
    this.val = val;
    this.next = null;
}
```

---

思路一:  (写法应该可以优化,哨兵？)
1.暴力破解,双指针从前开始循环, 每次拿到prev、curr、last进行判断
* 执行用时：64 ms, 在所有 JavaScript 提交中击败了96.29%的用户
* 内存消耗：39.1 MB, 在所有 JavaScript 提交中击败了74.63%的用户

思路二:
快慢指针

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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
    let j = n,
        prevNode = null,
        currentNode = head,
        lastNode = head
    while(j) {
        j--
        if(lastNode.next) {
            lastNode = lastNode.next
            if(j === 0) {
                j = n
                prevNode = currentNode
                lastNode = currentNode.next
                currentNode = currentNode.next
            }
        }else {
            if((prevNode === null) && currentNode) {
                head = currentNode.next
            }else {
                prevNode.next = ((prevNode.next || {}).next || null)
            }  
            break;
        }
        
    }
    return head
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 
1.解题时间太长，没有理清思路就开始写
