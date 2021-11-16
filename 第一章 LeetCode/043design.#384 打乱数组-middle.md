
### 题目: 打乱数组
##### 给你一个整数数组 nums ，设计算法来打乱一个没有重复元素的数组。
> 实现 Solution class:  
> &emsp; Solution(int[] nums) 使用整数数组 nums 初始化对象  
> &emsp; int[] reset() 重设数组到它的初始状态并返回  
> &emsp; int[] shuffle() 返回数组随机打乱后的结果  
      
      
> 输入  
  ["Solution", "shuffle", "reset", "shuffle"]  
  [[[1, 2, 3]], [], [], []]  
  输出  
  [null, [3, 1, 2], [1, 2, 3], [1, 3, 2]]  
> 解释  
  Solution solution = new Solution([1, 2, 3]);  
  solution.shuffle();    // 打乱数组 [1,2,3] 并返回结果。任何 [1,2,3]的排列返回的概率应该相同。例如，返回 [3, 1, 2]  
  solution.reset();      // 重设数组到它的初始状态 [1, 2, 3] 。返回 [1, 2, 3]  
  solution.shuffle();    // 随机返回数组 [1, 2, 3] 打乱后的结果。例如，返回 [1, 3, 2]  
  

---

思路一: 其实就是实现class的shuffle  
1.使用洗牌算法(每一项和后面随机一项交换)

---

```
/**
 * @param {number[]} nums
 */
var Solution = function(nums) {
    this.nums = nums
};

/**
 * @return {number[]}
 */
Solution.prototype.reset = function() {
    return this.nums
};

/**
 * @return {number[]}
 */
Solution.prototype.shuffle = function() {
    let temp = this.nums.slice()
    for(let i = 0; i < temp.length; i++) {
        let j = i + ~~(Math.random() * (temp.length - i));
        [temp[i], temp[j]] = [temp[j], temp[i]]
    }
    return temp
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  无

* 总结: 无
