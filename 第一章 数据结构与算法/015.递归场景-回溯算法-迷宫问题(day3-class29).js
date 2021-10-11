/**
 * 递归就是天生的回溯算法，解决迷宫问题
 * @param maze  二位数组迷宫
 * @param pos   当前位置[0, 0]
 * @param path  走出迷宫的路径
 * @param transverse    走过的格子
 *
 * [
 *   -------------------→ y轴
 *   |  [ 0 1 0 0 0 ]
 *   |  [ 0 1 0 1 1 ]
 *   |  [ 0 0 0 0 0 ]
 *   |  [ 0 1 1 1 0 ]
 *   |  [ 2 1 1 1 1 ]
 *   ↓
 *   x轴
 * ]
 * 注意点: x、y别弄反了，正常一维数组下标代表x，二位数组内的内容代表y
 */
function ratInMaze(maze, pos = [0, 0], path = [[...pos]], transverse = []) {
    // 起点即终点
    let [x, y] = pos;
    if (maze[x][y] === 2) return path
    // 记录走过的当前位置
    transverse[x * maze.length + y] = 1;
    // 找到可能的选择
    let choices = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]].filter(
        ([x, y]) => {
            return x >= 0
                    && x < maze.length
                    && y >= 0
                    && y < maze[0].length
                    && (maze[x][y] !== 1)
                    && !transverse[x * maze.length + y]
        }
    )
    // 对可能的选择,继续递归,寻找路径
    for (let [x, y] of choices) {
        let p = ratInMaze(maze, [x, y], path.concat([[x, y]]), transverse)
        if (p) return p
    }
}

let maze = [
    [0, 0, 0],
    [1, 0, 1],
    [2, 0, 0]
]
console.log(ratInMaze(maze))
// OUTPUT: [ [ 0, 0 ], [ 0, 1 ], [ 1, 1 ], [ 2, 1 ], [ 2, 0 ] ]
