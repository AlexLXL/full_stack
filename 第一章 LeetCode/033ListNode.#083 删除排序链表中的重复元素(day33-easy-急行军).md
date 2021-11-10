
### 题目: 删除排序链表中的重复元素
##### 存在一个按升序排列的链表，给你这个链表的头节点 head ，请你删除所有重复的元素，使每个元素 只出现一次 。
##### 返回同样按升序排列的结果链表。  
&nbsp;

![理解图](http://120.79.201.10:9000/leetcode_pic/083_01.jpg)
> 输入：head = [1,1,2]  
> 输出：[1,2] 

---
思路一:  
1.while循环,前端前后即可
---

&nbsp;

```
var deleteDuplicates = function(head) {
    var cur = head;
    while(cur && cur.next) {
        if(cur.val == cur.next.val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }
    return head;
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 无  

* 总结: 无
