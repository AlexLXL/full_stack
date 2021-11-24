
### 最近的请求次数

```
请你实现 RecentCounter 类：

    - RecentCounter() 初始化计数器，请求数为 0 。
    - int ping(int t) 在时间 t 添加一个新请求，其中 t 表示以毫秒为单位的某个时间，并返回过去 3000 毫秒内发生的所有请求数（包括新请求）。确切地说，返回在 [t-3000, t] 内发生的请求数。
```

示例1:

> 输入：  
  ["RecentCounter", "ping", "ping", "ping", "ping"]  
  [[], [1], [100], [3001], [3002]]  
  输出：  
  [null, 1, 2, 3, 3]  
> 
> 解释：
  RecentCounter recentCounter = new RecentCounter();  
  recentCounter.ping(1);     // requests = [1]，范围是 [-2999,1]，返回 1  
  recentCounter.ping(100);   // requests = [1, 100]，范围是 [-2900,100]，返回 2  
  recentCounter.ping(3001);  // requests = [1, 100, 3001]，范围是 [1,3001]，返回 3  
  recentCounter.ping(3002);  // requests = [1, 100, 3001, 3002]，范围是 [2,3002]，返回 3  
 

---

思路一: 
1.直接写

---

```
var RecentCounter = function() {
    this.data = []
};

RecentCounter.prototype.ping = function(t) {
    this.data.push(t)
    let idx = this.data.findIndex(item => item >= (t - 3000))
    return this.data.length - idx
};
```

* 技巧: 无 

* 优化空间: : 无 

* 学习: 无

* 总结: 无
