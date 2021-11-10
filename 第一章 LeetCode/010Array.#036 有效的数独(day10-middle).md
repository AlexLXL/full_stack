
### 题目: 有效的数独
> 请你判断一个 9x9 的数独是否有效。只需要 根据以下规则 ，验证已经填入的数字是否有效即可。      
> 数字 1-9 在每一行只能出现一次。  
> 数字 1-9 在每一列只能出现一次。  
> 数字 1-9 在每一个以粗实线分隔的 3x3 宫内只能出现一次。（请参考示例图）  
> 数独部分空格内已填入了数字，空白格用 '.' 表示。  
      
![示例图](http://120.79.201.10:9000/leetcode_pic/036_01.jpg)  

---
思路一:  
1.三个对象(行、列、单元格),遍历,将出现过的值放到里面  
2.通过 let boxIndex = ~~(j/3)*3 + ~~(i/3) 获取当前单元格  

思路二:   
1.通过二位数组和三维数组存储行、列和单元格,遍历,将出现过的值放到数组对应下标  
2.通过 let index = num.charCodeAt() - '0'.charCodeAt() - 1 获取数组下标  
![示例图](http://120.79.201.10:9000/leetcode_pic/036_02.jpg)
---

```
/**
 * @param {character[][]} board
 * @return {boolean}
 * 官方解法
 */
var isValidSudoku = function(board) {
    let row = Array(9).fill(0).map(() => Array(9).fill(0))
    let colums = Array(9).fill(0).map(() => Array(9).fill(0))
    let boxs = Array(3).fill(0).map(() => Array(3).fill(0).map(() => Array(9).fill(0)))
    for(let j = 0; j < 9; j++) {
        for(let i = 0; i < 9; i++) {
            let num  = board[j][i]
            if(num !== '.') {
                let index = num.charCodeAt() - '0'.charCodeAt() - 1
                row[j][index]++
                colums[i][index]++
                boxs[~~(j/3)][~~(i/3)][index]++
                if(row[j][index] > 1 || colums[i][index] > 1 || boxs[~~(j/3)][~~(i/3)][index] > 1) {
                    return false
                }
            }
        }
    }

    return true
};
```

* 技巧:  
1.'0'.charCodeAt()  =>  48  // String转Number - 1

* 优化空间: 无

* 学习:  
1.使用二位数组存储行、列出现的值  
2.使用三维数组存储单元格出现的值

* 总结: 无


