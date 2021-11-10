
### 题目: 反转链表 II
##### 给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。
      
&nbsp;

![理解图](http://120.79.201.10:9000/leetcode_pic/092_02.jpg)
> 输入：head = [1,2,3,4,5], left = 2, right = 4  
  输出：[1,4,3,2,5]

---

思路一:  
1.取出中间链表，反转后再拼接一起  
![理解图](http://120.79.201.10:9000/leetcode_pic/092_01.gif)

思路一:  
1.逐个往前放  
![理解图](http://120.79.201.10:9000/leetcode_pic/092_03.jpg)  
![理解图](http://120.79.201.10:9000/leetcode_pic/092_04.jpg)  
![理解图](http://120.79.201.10:9000/leetcode_pic/092_05.jpg)  
![理解图](http://120.79.201.10:9000/leetcode_pic/092_06.jpg)

---

```
/**
 * 思路一:
 */
var reverseBetween = function(head, left, right) {
    // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
    const dummyNode = new ListNode(-1);
    dummyNode.next = head;

    let pre = dummyNode;
    // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
    // 建议写在 for 循环里，语义清晰
    for (let i = 0; i < left - 1; i++) {
        pre = pre.next;
    }

    // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
    let rightNode = pre;
    for (let i = 0; i < right - left + 1; i++) {
        rightNode = rightNode.next;
    }

    // 第 3 步：切断出一个子链表（截取链表）
    let leftNode = pre.next;
    let curr = rightNode.next;

    // 注意：切断链接
    pre.next = null;
    rightNode.next = null;

    // 第 4 步：同第 206 题，反转链表的子区间
    reverseLinkedList(leftNode);

    // 第 5 步：接回到原来的链表中
    pre.next = rightNode;
    leftNode.next = curr;
    return dummyNode.next;
};

const reverseLinkedList = (head) => {
    let pre = null;
    let cur = head;

    while (cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
}
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无  

* 总结: 无
