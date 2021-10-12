
### 题目: 字符串中的第一个唯一字符

> s = "leetcode"  
> 返回 0  
>
> s = "loveleetcode"  
> 返回 2

---
思路一:  
1.遍历str生成哈希表来统计出现次数
2.遍历str,根据哈希表值返回下标

思路二(更优):  
1.创建无符号16位数组,长度26,来对应26个字母的ASCII  
2.遍历str,在数组对应下标的value++  
3.遍历str,看数组对应下标的value(这一步要比hash表查询快),返回遍历str时的下表  
---

```
/**
 * @param {string} s
 * @return {number}
 * 执行用时：76 ms, 在所有 JavaScript 提交中击败了98.90%的用户
 * 内存消耗：41.1 MB, 在所有 JavaScript 提交中击败了71.51%的用户
 */
var firstUniqChar = function(s) {
    let h = new Uint16Array(26),
        idx = s.length
    // 循环一次数组
    while(idx--) {
        h[s.charCodeAt(idx) - 97]++
    }
    // 再循环一次
    idx = -1
    while(++idx < s.length) {
        if(h[s.charCodeAt(idx) - 97] === 1) {
            return idx
        }
    }
    return -1
};
```

* 技巧: 无 

* 优化空间: 无

* 学习:  
1.生成无符号16位，长度为26的数组  
    new Uint16Array(26)  
    // OUTPUT: Uint16Array(26) [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

* 总结:  
1.数组的查询速度要比哈希表快,所以尽量考虑是用数组查询★★
2.存储小写字母的是考虑使用Uint16Array存储对应ASCII★