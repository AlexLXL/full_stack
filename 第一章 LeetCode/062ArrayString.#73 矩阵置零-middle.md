
### 矩阵置零

##### 给定一个 m x n 的矩阵，如果一个元素为 0 ，则将其所在行和列的所有元素都设为 0 。请使用 原地 算法。

```
进阶：
    ● 一个直观的解决方案是使用  O(mn) 的额外空间，但这并不是一个好的解决方案。
    ● 一个简单的改进方案是使用 O(m + n) 的额外空间，但这仍然不是最好的解决方案。
    ● 你能想出一个仅使用常量空间的解决方案吗？
```

![示例1](./img/73_01.jpg)  
> 输入：matrix = [[1,1,1],[1,0,1],[1,1,1]]  
  输出：[[1,0,1],[0,0,0],[1,0,1]]  

![示例1](./img/73_02.jpg)  
> 输入：matrix = [[0,1,2,0],[3,4,5,2],[1,3,1,5]]  
  输出：[[0,0,0,0],[0,4,5,0],[0,3,1,0]]  

---

思路1: 
1.遍历二位数组, 拿到x为0的存到x数组, y为0的存到y数组
2.遍历存起来的x数组和y数组, 重置值

思路2:
1.首行首列标记法, 先拿到首行和首列值为0的下标, 存起来
2.循环二位数组(从[1,1]开始循环), 遇到0时, 假如是[x1, y1], 将首行的x1位置置为0, 首列y1位置置为0
3.循环二位数组, 根据首行和首列的0, 开始重置数组
4.根据步骤1的值恢复首行和首列

---

```
// 思路1:
var setZeroes = function(matrix) {
    let ylen = matrix.length
    let xlen = matrix[0].length
    let yAxis = new Set()
    let xAxis = new Set()
    for(let x = 0; x < xlen; x++) {
        for(let y = 0; y < ylen; y++) {
            if(matrix[y][x] === 0) {
                yAxis.add(y)
                xAxis.add(x)
            }
        }
    }
    for(let y of yAxis) {
        matrix[y] = Array(xlen).fill(0)
    }
    for(let x of xAxis) {
        for(let y = 0; y < ylen; y++) {
            matrix[y][x] = 0
        }
    }
    return matrix
};

// 思路2:
var setZeroes = function(matrix) {
    const m = matrix.length, n = matrix[0].length;
    let flagCol0 = false;
    for (let i = 0; i < m; i++) {
        if (matrix[i][0] === 0) {
            flagCol0 = true;
        }
        for (let j = 1; j < n; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = matrix[0][j] = 0;
            }
        }
    }
    for (let i = m - 1; i >= 0; i--) {
        for (let j = 1; j < n; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
        if (flagCol0) {
            matrix[i][0] = 0;
        }
    }
};
```

* 技巧: 无 

* 优化空间: 无 

* 学习: 无

* 总结: 
1. 矩阵利用首行和首列做标记, 节省空间
