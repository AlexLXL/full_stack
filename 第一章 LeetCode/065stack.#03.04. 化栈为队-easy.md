
### 面试题 03.04. 化栈为队

##### 两个栈组合成队列

> MyQueue queue = new MyQueue();  
> queue.push(1);  
> queue.push(2);  
> queue.peek();  // 返回 1  
> queue.pop();   // 返回 1  
> queue.empty(); // 返回 false  
  

---

正确思路
1.出队列的时候用另一个栈存一下就好

---

```
/**
 * Initialize your data structure here.
 */
var MyQueue = function() {
    this.data = []
    this.temp = []
};

/**
 * Push element x to the back of queue. 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
    this.data.push(x)
};

/**
 * Removes the element from in front of queue and returns that element.
 * @return {number}
 */
MyQueue.prototype.pop = function() {
    while(this.data.length) {
        let v = this.data.pop()
        if(!this.data.length) {
            while(this.temp.length) {
                this.data.push(this.temp.pop())
            }
            return v
        }
        this.temp.push(v)
    }
};

/**
 * Get the front element.
 * @return {number}
 */
MyQueue.prototype.peek = function() {
    return this.data[0]
};

/**
 * Returns whether the queue is empty.
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
    return !this.data.length
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
