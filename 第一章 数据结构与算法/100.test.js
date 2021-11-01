function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}
let t1 = new TreeNode(
    3,
    new TreeNode(9),
    new TreeNode(
        20,
        new TreeNode(15),
        new TreeNode(7)
    )
)

let max = 0
let deep = 0
var maxDepth = function (root) {
    if (root === null) {
        return deep;
    }
    deep++;
    max = Math.max(maxDepth(root.left), max);
    (root.left !== null) && deep--;
    max = Math.max(maxDepth(root.right), max);
    return max;
};

console.log(maxDepth(t1))