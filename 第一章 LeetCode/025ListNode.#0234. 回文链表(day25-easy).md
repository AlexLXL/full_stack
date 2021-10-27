
### 题目: 回文链表
##### 给你一个单链表的头节点 head ，请你判断该链表是否为回文链表。如果是，返回 true ；否则，返回 false 。

> 输入：head = [1,2,2,1]
  输出：true
> 输入：head = [1,2]
  输出：false

---
思路一:  
1.存到数组内，循环对比

思路二:
1.取前半段(给两个指针，一个走一步，一个走两步), 后半段进行链表反转, 循环连个前/后半段,
循环对比

---

&nbsp;

```

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 * 
 * 执行用时：152 ms, 在所有 JavaScript 提交中击败了80.81%的用户
 * 内存消耗：63.9 MB, 在所有 JavaScript 提交中击败了65.11%的用户
 */eturn {boolean}
 */
var isPalindrome = function(head) {
    let arr = []
    let temp = head
    while(temp) {
        arr.push(temp.val)
        temp = temp.next
    }
    let len = arr.length
    for(let i = 0; i < len/2; i++) {
        if(arr[i] !== arr[len-1-i]) {
            return false
        }
    }
    return true
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无

* 总结: 
1.链表取前半段和反转的看这里  
链接: https://leetcode-cn.com/problems/palindrome-linked-list/solution/hui-wen-lian-biao-by-leetcode-solution/
