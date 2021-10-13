// 问题1: 获取树的最长同值"路径"
/**
 * 二叉树表示
 */
class BinaryTree {
    constructor(value, left = null, right = null) {
        this.value = value
        this.left = left
        this.right = right
    }
}

let binaryTree = new BinaryTree(
    5,
    new BinaryTree(
        6,
        new BinaryTree(
            6
        ),
        new BinaryTree(
            6
        )
    ),
    new BinaryTree(
        8,
        new BinaryTree(
            7
        ),
        new BinaryTree(
            9
        )
    )
)

/**
 * 求普通路径的最长路径
 * 普通路径--只会从上往下的路劲
 * @param node
 * @param val
 * @returns {number}
 */
function maxLongestLevel(node, val) {
    return (node && node.value === val) ?
        Math.max(maxLongestLevel(node.left, val), maxLongestLevel(node.right, val)) + 1 :
        0
}

// console.log(maxLongestLevel(binaryTree, 5))


/**
 * 迭代-获取树所有节点
 * @param node
 * @returns {any}
 */
function* tansverse(node) {
    yield node
    if (node.left) {
        yield* tansverse(node.left)
    }
    if (node.right) {
        yield* tansverse(node.right)
    }
}

/**
 * 求含左右路径的最长路径
 * 含左右路径--可以从下 -> 上 -> 下
 */
function maxLongestPath(node) {
    // 两种写法等效

    // return [...tansverse(node)].reduce((max, n) => {
    //     return Math.max(maxLongestLevel(n.left, n.value) + maxLongestLevel(n.right, n.value), max)
    // }, 0)

    return Math.max(
        ...[...tansverse(node)].map((n) => {
            return maxLongestLevel(n.left, n.value) + maxLongestLevel(n.right, n.value)
        })
    )
}
// console.log(maxLongestPath(binaryTree))   // OUTPUT: 2


//==================================================================


/**
 * 问题2: 给定一个数组，是否存在取里面n个值，等于目标值k
 * 例: [3,5,8], 13
 * 解法1: 求[3,5,8]的所有子集,看是否有等于13的
 * 解法2: ★★
 * 新建一个数组[]
 * 先取3  =>  [3]
 * 再取5  =>  [3, 8, 5]   说明: 8是用3+5
 * 再取8  =>  [3, 8, 5, 11, 16, 13]   说明: 这就是所有子集可以组成的和
 */
function haveSolution(arr, N) {
    let set = new Set([arr[0]])
    while (arr.length > 0) {
        let ak = arr.shift();
        [...set].forEach(x => {
            set.add(x + ak)
        })
        set.add(ak)
    }
    return set.has(N)
}

// console.log(haveSolution([3,5,8], 13))   // OUTPUT: true
// console.log(haveSolution([3,5,9], 13))   // OUTPUT: false
// console.log(haveSolution([3,5,9,13], 13))   // OUTPUT: true
// console.log(haveSolution([3, 1], 2))    // OUTPUT: false


//==================================================================


/**
 * 问题3: 全排列
 * P[1,2,3] = 1,P[2,3] ∪ 2,P[1,3] ∪ 3,P[1,2]
 *               ||
 *              递归
 * 并集在递归的表示[].concat(...结果数组)★★★
 */
function permutation(A) {
    if (A.length === 1) return A
    return [].concat(
        ...A.map((a, i) => {
            return permutation(A.slice(0, i).concat(A.slice(i + 1))).map(p => [a].concat(p))
        })
    )
}

// console.log(JSON.stringify(permutation([1,2,3])))   // OUTPUT: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
// 量级在10位左右,算法优化后可以到12位
/**
 * 问题3: 全排列优化(基于交换)class69
 * 解:
 * [1,2,3]
 * => [3,2,1] 第一位移到最后
 *    => [3,2] 进行可能的交换
 *    => 还原成[3,2]
 * => 还原成[1,2,3]
 * => [1,3,2] 第二位移到最后
 *    => [1,3] 进行可能的交换
 *    => 还原成[1,3]
 * => 还原成[1,2,3]
 */
function* permutationBaseOnSwap(A, N = A.length) {
    if (N === 1) {
        yield A.slice();
        return;
    }
    for (let i = 0; i < N; i++) {
        swap(A, i, N - 1)
        yield* permutationBaseOnSwap(A, N - 1)
        swap(A, i, N - 1)
    }
}
// console.log(JSON.stringify([...permutationBaseOnSwap([1, 2, 3])]))  // OUTPUT: [[2,3,1],[3,2,1],[3,1,2],[1,3,2],[2,1,3],[1,2,3]]
/**
 * 问题3: 全排列优化(Heap方法)
 */
function* permutationBaseOnSwapAndHeap(A, N = A.length) {
    if (N === 1) {
        yield A.slice();
        return;
    }
    for (let i = 0; i < N; i++) {
        yield* permutationBaseOnSwap(A, N - 1)
        if (N % 2 == 1) {
            swap(A, i, N - 1)
        }else {
            swap(A, 0, N - 1)
        }
    }
}
// console.log([...permutationBaseOnSwapAndHeap([1,2,3])]) // OUTPUT: [[2,3,1],[3,2,1],[3,1,2],[1,3,2],[2,1,3],[1,2,3]]

function swap(A, i, j) {
    let temp = A[i]
    A[i] = A[j]
    A[j] = temp
}




