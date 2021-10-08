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


let board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]
isValidSudoku(board)