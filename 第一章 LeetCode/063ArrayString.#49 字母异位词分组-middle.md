
### 字母异位词分组

##### 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。
##### 字母异位词 是由重新排列源单词的字母得到的一个新单词，所有源单词中的字母通常恰好只用一次。
      

> 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]  
  输出: [["bat"],["nat","tan"],["ate","eat","tea"]]  

> 输入: strs = [""]  
  输出: [[""]]  

> 输入: strs = ["a"]  
  输出: [["a"]]  

---

思路1: 
1.循环, 排序每一个字符串, 存储到map里面
2.拿到map的所有value放到数组即可

思路2:
1.把排序改成用之前的uint16Array来统计

---

```
// 思路1:
var groupAnagrams = function(strs) {
    if(strs.length <= 1) return [strs]
    let map = new Map()
    for(let i = 0; i < strs.length; i++) {
        let v = strs[i]
        let key = v.split('').sort((a,b) => a.localeCompare(b)).join()
        let arr = map.get(key)
        if(arr) {
            arr.push(v)
        }else {
            map.set(key, [v])
        }
    }
    return [...map.values()]
};

// 思路2:
var groupAnagrams = function(strs) {
    const map = new Object();
    for (let s of strs) {
        const count = new Array(26).fill(0);
        for (let c of s) {
            count[c.charCodeAt() - 'a'.charCodeAt()]++;
        }
        map[count] ? map[count].push(s) : map[count] = [s];
    }
    return Object.values(map);
};

```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 无
