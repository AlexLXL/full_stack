/**
 * 汉罗塔递归
 * @param n 盘子数量
 * @param from  移动前的开始塔
 * @param to    移动到的目标塔
 * @param use   可使用的塔
 *
 * 循环不变式
 *      1.盘子[1,2],从A塔移动到C塔的步骤: (1).1盘子从A塔移动到B塔  (2).2盘子从A塔移动到C塔  (3).盘子从B塔移动到C塔
 *      2.将多个盘子的问题分解成两个盘子的问题: 如.盘子[1,2,3]从A塔移动到C塔,将盘子[1,2]理解为一个整体:
 *          (1).[1,2]盘子从A塔移动到B塔
 *          (2).3盘子从A塔移动到C塔
 *          (3).[1,2]盘子从B塔移动到C塔
 */
function moveTower(n, from, to, use) {
    if (n === 1) {
        moveDick(from, to)
    }else {
        moveTower(n - 1, from, use, to)
        moveDick(from, to)
        moveTower(n - 1, use, to, from)
    }
}

function moveDick(from, to) {
    to.unshift(from.shift())
}
let from = [1, 3, 5, 7, 9]
let use = []
let to = []

moveTower(from.length, from, to, use)
console.log(`from: ${from}`)
console.log(`use: ${use}`)
console.log(`to: ${to}`)
