class Node {
    constructor(val, parent) {
        this.val = val
        this.left = null
        this.right = null
        this.parent = parent
    }
}

class BST {
    constructor() {
        this.root = null
    }

    add(val) {
        if (this.root === null) {
            this.root = new Node(val, null)
        } else {
            let root = this.root
            let parent = null
            let isLess = null
            while (root) {
                parent = root
                isLess = root.val > val
                root = isLess ? root.left : root.right
            }
            if (isLess) {
                parent.left = new Node(val, parent)
            } else {
                parent.right = new Node(val, parent)
            }
        }
    }

    // 前序
    preOrderTraversal(current = this.root) {
        console.log(current.val)
        current.left && this.preOrderTraversal(current.left)
        current.right && this.preOrderTraversal(current.right)
    }

    // 后序
    postOrderTraversal(current = this.root) {
        current.left && this.postOrderTraversal(current.left)
        current.right && this.postOrderTraversal(current.right)
        console.log(current.val)
    }

    // 中序
    inOrderTraversal(current = this.root) {
        current.left && this.inOrderTraversal(current.left)
        console.log(current.val)
        current.right && this.inOrderTraversal(current.right)
    }

    // 广度优先搜索
    breadthFirstSearch() {
        let queue = [this.root]
        while (queue.length) {
            let n = queue.shift()
            n.left && queue.push(n.left)
            n.right && queue.push(n.right)
            console.log(n.val)
        }
    }

    // 反转二叉树(利用上多的遍历都能实现)
    preOrderTraversalReverseTree(current = this.root) {
        let temp = current.right
        current.right = current.left
        current.left = temp
        current.left && this.preOrderTraversalReverseTree(current.left)
        current.right && this.preOrderTraversalReverseTree(current.right)
    }
}

let bst = new BST()
let arr = [10, 8, 19, 6, 15, 22, 9]
arr.forEach(item => {
    bst.add(item)
})
// console.dir(bst, {depth: 10})
/**
 *          10
 *       8     19
 *     6  9   15 22
 */
// bst.preOrderTraversal()      // 10, 8, 6, 9, 19, 15, 22
// bst.postOrderTraversal()     // 6, 9, 8, 15, 22, 19, 10
// bst.inOrderTraversal()       // 6, 8, 9, 10, 15, 19, 22
// bst.breadthFirstSearch()     // 10, 8, 19, 6, 9, 15, 22
bst.preOrderTraversalReverseTree()     //
console.dir(bst, {depth: 10})
/**
 *          10
 *       19     8
 *     22  15  9 6
 */