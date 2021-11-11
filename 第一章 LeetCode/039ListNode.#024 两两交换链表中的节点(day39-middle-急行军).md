
### 题目: 两两交换链表中的节点
##### 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
##### 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

![理解图](http://120.79.201.10:9000/leetcode_pic/024_02.jpg)
> 输入：head = [1,2,3,4]  
  输出：[2,1,4,3]  
>
> 输入：head = []  
  输出：[]  
>
> 输入：head = [1]  
  输出：[1]  

---

思路一: (不好)   
1.根据画图规则进行循环  
![理解图](http://120.79.201.10:9000/leetcode_pic/024_03.jpg)
![理解图](http://120.79.201.10:9000/leetcode_pic/024_04.jpg)

思路二: 递归  
1.每隔两个递归一次

思路三: 
1.根据画图规则进行循环
![理解图](http://120.79.201.10:9000/leetcode_pic/024_01.gif)

---

```
/**
 * 思路二:
 */
var swapPairs = function(head) {
    if (head === null|| head.next === null) {
        return head;
    }
    const newHead = head.next;
    head.next = swapPairs(newHead.next);
    newHead.next = head;
    return newHead;
};

/**
 * 思路三:
 */
var swapPairs = function(head) {
    const dummyHead = new ListNode(0);
    dummyHead.next = head;
    let temp = dummyHead;
    while (temp.next !== null && temp.next.next !== null) {
        const node1 = temp.next;
        const node2 = temp.next.next;
        temp.next = node2;
        node1.next = node2.next;
        node2.next = node1;
        temp = node1;
    }
    return dummyHead.next;
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.思考调换的先后顺序怎样才是好的
2.有一定规律执行的代码, 尝试每次返回下一次需要的值, 然后看能不能递归解题★★

* 总结: 无
