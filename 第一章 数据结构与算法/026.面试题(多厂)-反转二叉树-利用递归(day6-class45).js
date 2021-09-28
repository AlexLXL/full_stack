class TreeNode {
    constructor(value) {
        this.left = null
        this.right = null
        this.value = value
    }
}
let root = new TreeNode(1)
root.left = new TreeNode(9)
root.right = new TreeNode(5)
root.left.left = new TreeNode(3)
root.left.right = new TreeNode(7)
root.right.left = new TreeNode(2)
root.right.right = new TreeNode(4)
root.left.left.left = new TreeNode(8)
console.log(root)
/*
TreeNode {
  left:
   TreeNode {
     left: TreeNode { left: [TreeNode], right: null, value: 3 },
     right: TreeNode { left: null, right: null, value: 7 },
     value: 9 },
  right:
   TreeNode {
     left: TreeNode { left: null, right: null, value: 2 },
     right: TreeNode { left: null, right: null, value: 4 },
     value: 5 },
  value: 1 }
 */

function reverseBTree(node) {
    if (!node) {
        return
    }
    let temp = node.left
    node.left = node.right
    node.right = temp
    reverseBTree(node.left)
    reverseBTree(node.right)
}
reverseBTree(root)
console.log(root)
/*
TreeNode {
  left:
   TreeNode {
     left: TreeNode { left: null, right: null, value: 4 },
     right: TreeNode { left: null, right: null, value: 2 },
     value: 5 },
  right:
   TreeNode {
     left: TreeNode { left: null, right: null, value: 7 },
     right: TreeNode { left: null, right: [TreeNode], value: 3 },
     value: 9 },
  value: 1 }
*/