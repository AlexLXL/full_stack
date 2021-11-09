
### 题目: 第一个错误的版本
##### 假设你有 n 个版本 [1, 2, ..., n]，你想找出导致之后所有版本出错的第一个错误的版本。
##### 你可以通过调用 bool isBadVersion(version) 接口来判断版本号 version 是否在单元测试中出错。实现一个函数来查找第一个错误的版本。你应该尽量减少对调用 API 的次数。
     
&nbsp;

> 输入：n = 5, bad = 4  
> 输出：4  
> 解释：  
> 调用 isBadVersion(3) -> false   
> 调用 isBadVersion(5) -> true   
> 调用 isBadVersion(4) -> true  
> 所以，4 是第一个错误的版本。  
> 输入：n = 1, bad = 1
> 输出：1
  
  来源：力扣（LeetCode）
  链接：https://leetcode-cn.com/problems/first-bad-version
  著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
  

---

思路一:  
1.二分法查找

---

&nbsp;

```
/**
 * Definition for isBadVersion()
 * 
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let l = 1
        let r = n
        while(l < r) {
            const g = ((l + r) / 2) << 0
            if(isBadVersion(g)) {
                r = g
            }else {
                l = g + 1
            }
        }
        return r
    };
};
```

* 技巧: 无 

* 优化空间: 无

* 学习: 
1.复习一下二分法(双指针 + while)  

* 总结: 无
