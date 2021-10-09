/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function(matrix) {
    let len = matrix.length
    for(let j = 0; j < (len / 2); j++) {
        for(let i = j; i < (len - j - 1); i++) {
            let temp = matrix[j][i]
            let r = len - 1 - j
            let c = len - 1 - i
            matrix[j][i] = matrix[c][j]
            matrix[c][j] = matrix[r][c]
            matrix[r][c] = matrix[i][r]
            matrix[i][r] = temp
        }
    }
};

let A = [[1,2,3],[4,5,6],[7,8,9]]
rotate(A)
console.log(A)