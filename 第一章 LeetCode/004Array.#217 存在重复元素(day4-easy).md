
### 题目: 存在重复元素
> 输入: [1,2,3,1]  
> 输出: true 
 
 
```
/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
    let set = new Set();
    for(let v of nums) {
        if(set.has(v)) {
            return true
        }
        set.add(v)
    }
    return false
};
```

* 技巧: 哈希表Set

* 学习:   
1.hashTable哈希表 = Set = 一维数组(把对象的key存进去,且去重)  
2.hashMap里包含hashTable(详细可看Rust的有道云笔记)

* 总结:   
1.有查询速度: Set>Map>Array (在查找key的时候优先使用Set)  
链接: https://www.cnblogs.com/xu0428/p/14930312.html
