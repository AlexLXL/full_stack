/**
 * 问题1.树的轮廓（从左边看树,能看到的每行的值）
 *
 * 分析问题:
 *  1.有一颗树, 参数N
 *  2.从左侧看每行的第一个值,关键词"行",即需要一个参数表示当前是第几行, 参数d
 *  3.返回参数为数组,下标i存放第i层的第一个值, 参数result
 *
 * 拆分问题:
 *  1.第一层: result[0]没值就直接放
 *  2.递归第二层左边: result[1]没值就直接放
 *  3.递归第二层右边: result[1]没值就直接放
 *
 */
class Node {
    constructor(value) {
        this.left = null
        this.right = null
        this.value = value
    }
}
let root = new Node(1)
root.left = new Node(5)
root.left.left = new Node(4)
root.left.right = new Node(2)
root.right = new Node(9)
root.right.left = new Node(7)
root.right.right = new Node(3)
root.right.right.right = new Node(8)

function leftOutlineTree(node, d = 0, result = []) {
    if (!node) {
        return
    }
    if (!result[d]) {
        result[d] = node.value
    }
    leftOutlineTree(node.left, d + 1, result)
    leftOutlineTree(node.right, d + 1, result)
    return result
}
console.log(leftOutlineTree(root)) // [ 1, 5, 4, 8 ]


/**
 *
 * 问题2.树的每行最大值
 *
 * 分析问题:
 *  1.要有一棵树, 参数N
 *  2.要拿每行的最大值,关键词"行",即需要一个参数表示行, 参数d
 *  3.要拿每行的最大值,关键词"最大值", 即每次递归到第d行的时候需要比较前一个值，取最大值
 *  4.返回参数为数组,下标i存放第i层的最大值, 参数result
 *
 *  拆分问题:
 *  1.第一层: result[0]没值直接放
 *  2.递归第二层左边: result[1]没值直接放
 *  3.递归第二层右边: result[1]没值就直接放,有值就通过Math.max(a,b)取最大值放
 *
 */
function maxOfLine(node, d = 0, result = []) {
    if (!node) {
        return
    }
    result[d] = Math.max(result[d] || -1, node.value)
    maxOfLine(node.left, d + 1, result)
    maxOfLine(node.right, d + 1, result)
    return result
}
console.log(maxOfLine(root)) // [ 1, 9, 7, 8 ]

