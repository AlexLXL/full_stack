/**
 * 跟着视频敲，暂时没看懂
 * 八皇后问题
 */

/**
 * 判断两个皇后是否兼容:
 * 是否在一个x轴,是否在一个y轴,dx和dy是否相等(dx = x2 - x1)
 * @param p 第一个皇后位置(0-16)
 * @param q 第二个皇后位置(0-16)
 * @param n n*n棋盘
 * @returns {boolean} true为兼容
 */
function compatible(p, q, n) {
    let [x1, y1] = [~~(p / n), p % n]
    let [x2, y2] = [~~(q / n), q % n]
    return x1 !== x2
        && y1 !== y2
        && Math.abs(x1 - x2) !== Math.abs(y1 - y2)
}

/**
 * 判断一组决策是否兼容 如decisions = [1, 7, 8, 14]
 * @param n
 * @param decisons
 */
function is_goal(n, decisons) {
    // 两次循环来把[1, 7, 8, 14]两两对比
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++){
            if (i === j) { continue }
            if (!compatible(decisons[i], decisons[j], n)) {
                return false
            }
        }
    }
    return true
}

/**
 * 递归
 * @param n n*n棋盘
 * @param decisions 决策数组
 */
function queen(n, decisions = [], hset = {}) {
    if (decisions.length === n) {
        //  ================================
        // 7- decisiions在添加值的时候只保留递增的值
        //    这样这里就不用排序了，只保留递增值过程同时也去除了重复项
        // decisions.sort((a, b) => a - b) // 5+
        // let hash = decisions.join("-") // 5+
        // if (hset[hash]) return [] // 5+
        // hset[hash] = 1 // 5+
        // return is_goal(n, decisions) ? [decisions] : []
        //  ================================
        return [decisions] // 7+
    }
    let r = []
    let start = decisions[decisions.length - 1] || -1; // 7+
    for (let i = start + 1; i < n * n; i++) { // 7+
        // 6+ 只判断了是否在决策力，没判断是否兼容
        //    而这部分决策是没有递归的必要的
        if (decisions.indexOf(i) === -1) {
            // 6+
            if (decisions.every(j => compatible(i, j, n))) {
                r = r.concat( queen(n, decisions.concat(i), hset) ) // 5+
            }
        }
    }
    return r
}

console.log(queen(9))