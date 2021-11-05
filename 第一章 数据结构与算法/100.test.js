var levelOrder = function (root) {
    // if(root === null) return []
    // root.id = 0
    // let queue = [root]
    // let result = []
    // while(queue.length) {
    //     let node = queue.shift()
    //     result[node.id] ? result[node.id].push(node.val) : (result[node.id] = [node.val])
    //     node.left && (node.left.id = node.id + 1) && queue.push(node.left)
    //     node.right && (node.right.id = node.id + 1) && queue.push(node.right)
    // }
    // return result
};

// 执行用时：68 ms, 在所有 JavaScript 提交中击败了90.77% 的用户
// 内存消耗：39.6 MB, 在所有 JavaScript 提交中击败了41.40% 的用户

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let tree = new TreeNode(3,
    new TreeNode(9),
    new TreeNode(20,
        new TreeNode(15),
        new TreeNode(7),
        ),
    )


console.log(levelOrder(tree))