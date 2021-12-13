function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

let root = new TreeNode(1,
    new TreeNode(),
    new TreeNode(2,
        new TreeNode(3)
        )
    )


var postorderTraversal = function(root) {
    let result = []
    root.right && result.concat(...postorderTraversal(root.right))
    root.left && result.concat(...postorderTraversal(root.left))

    if(!root.right) return result.concat(root.val)
    if(!root.left) return result.concat(root.val)
};

console.log(postorderTraversal(root))
