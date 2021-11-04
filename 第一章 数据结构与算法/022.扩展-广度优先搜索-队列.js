function node(key) {
    this.children = []
    this.key = key
}
let n1 = new node("1")
let n2 = new node("2")
let n3 = new node("3")
let n4 = new node("4")
let n5 = new node("5")
let n6 = new node("6")

n1.children.push(n2)
n1.children.push(n5)
n2.children.push(n3)
n2.children.push(n4)
n5.children.push(n6)

/**
 * 广度优先搜索-队列(后进前出★★)
 * 先输出第一层级的1，再输出第二层级别2,5,最后输出第三层3,4,6
 * @param node
 */
function bfs(node) {
    let queue = [node]
    while (queue.length) {
        let first = queue.shift()
        console.log(first.key)
        first.children.slice().forEach((item) => {
            queue.push(item)
        })
    }
}
bfs(n1)
// OUTPUT: 1,2,5,3,4,6


/**
 * 衍生的广度优先搜索-队列
 * 内部使用for循环来取所有值，然后push下一行的
 *
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
function bfsDerive(root) {
    if (!root) return []
    const queue = [root];
    while (queue.length !== 0) {
        const len = queue.length;
        for (let i = 0; i < len; i++) {
            const node = queue.shift();
            console.log(node.val)
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }
}