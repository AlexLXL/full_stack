
### 题目: 最小栈
##### 设计一个支持 push ，pop ，top 操作，并能在常数时间内检索到最小元素的栈。
> push(x) —— 将元素 x 推入栈中。  
> pop() —— 删除栈顶的元素。  
> top() —— 获取栈顶元素。  
> getMin() —— 检索栈中的最小元素。  
      
```
输入：
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

输出：
[null,null,null,null,-3,null,0,-2]

解释：
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin();   --> 返回 -3.
minStack.pop();
minStack.top();      --> 返回 0.
minStack.getMin();   --> 返回 -2.
```

---

思路一:  
1.数组存数据, 加一个top指针拿值 (后来发现这个top意义不大, 数据很大的时候每次用Math.min拿最小值性能不高)

思路二: 
1.数组存数据
2.最小值也用数组存(存对应每个下标的最小值)

---

```
var MinStack = function() {
    this.x_stack = [];
    this.min_stack = [Infinity];
};

MinStack.prototype.push = function(x) {
    this.x_stack.push(x);
    this.min_stack.push(Math.min(this.min_stack[this.min_stack.length - 1], x));
};

MinStack.prototype.pop = function() {
    this.x_stack.pop();
    this.min_stack.pop();
};

MinStack.prototype.top = function() {
    return this.x_stack[this.x_stack.length - 1];
};

MinStack.prototype.getMin = function() {
    return this.min_stack[this.min_stack.length - 1];
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.使用数组来规避 计算最大最小值 的循环

* 总结: 无
