
### 设计循环双端队列

```
设计实现双端队列。
你的实现需要支持以下操作：

    - MyCircularDeque(k)：构造函数,双端队列的大小为k。
    - insertFront()：将一个元素添加到双端队列头部。 如果操作成功返回 true。
    - insertLast()：将一个元素添加到双端队列尾部。如果操作成功返回 true。
    - deleteFront()：从双端队列头部删除一个元素。 如果操作成功返回 true。
    - deleteLast()：从双端队列尾部删除一个元素。如果操作成功返回 true。
    - getFront()：从双端队列头部获得一个元素。如果双端队列为空，返回 -1。
    - getRear()：获得双端队列的最后一个元素。 如果双端队列为空，返回 -1。
    - isEmpty()：检查双端队列是否为空。
    - isFull()：检查双端队列是否满了。
```

示例1:

> MyCircularDeque circularDeque = new MycircularDeque(3); // 设置容量大小为3  
  circularDeque.insertLast(1);			        // 返回 true  
  circularDeque.insertLast(2);			        // 返回 true  
  circularDeque.insertFront(3);			        // 返回 true  
  circularDeque.insertFront(4);			        // 已经满了，返回 false  
  circularDeque.getRear();  				    // 返回 2  
  circularDeque.isFull();				        // 返回 true  
  circularDeque.deleteLast();			        // 返回 true  
  circularDeque.insertFront(4);			        // 返回 true  
  circularDeque.getFront();				        // 返回 4  

---

思路一: 
1.直接写就好啦

---

```
var MyCircularDeque = function(k) {
        this.data = []
        this.max = k
        this.size = 0
};

MyCircularDeque.prototype.insertFront = function(value) {
    if(this.size === this.max) return false
    this.size++
    this.data.unshift(value)
    return true
};

MyCircularDeque.prototype.insertLast = function(value) {
    if(this.size === this.max) return false
    this.size++
    this.data.push(value)
    return true
};

MyCircularDeque.prototype.deleteFront = function() {
    if(!this.size) return false
    this.size--
    this.data.shift()
    return true
};

MyCircularDeque.prototype.deleteLast = function() {
    if(!this.size) return false
    this.size--
    this.data.pop()
    return true
};

MyCircularDeque.prototype.getFront = function() {
    if(!this.size) return -1
    return this.data[0] 
};

MyCircularDeque.prototype.getRear = function() {
    if(!this.size) return -1
    return this.data[this.size - 1] 
};

MyCircularDeque.prototype.isEmpty = function() {
    return !this.size
};

MyCircularDeque.prototype.isFull = function() {
    return this.size === this.max
};
```

* 技巧: 无 

* 优化空间: : 无 

* 学习: 无

* 总结: 无
