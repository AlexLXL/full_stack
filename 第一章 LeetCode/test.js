var isValidBST = function (root) {
    if (root === null) {
        return true
    }
    let result = []
    if (root.left) {
        if (root.val <= root.left.val) {
            return false
        }
        if (root.left.left) {
            if (root.val <= root.left.left.val) {
                return false
            }
        }
        if (root.left.right) {
            if (root.val <= root.left.right.val) {
                return false
            }
        }
        let r1 = isValidBST(root.left)
        result.push(r1)
    }
    if (root.right) {
        if (root.val >= root.right.val) {
            return false
        }
        if (root.right.left) {
            if (root.val >= root.right.left.val) {
                return false
            }
        }
        if (root.right.right) {
            if (root.val >= root.right.right.val) {
                return false
            }
        }
        let r2 = isValidBST(root.right)
        result.push(r2)
    }
    return result.includes(false) ? false : true
};

function TreeNode(val, left, right) {
    this.val = (val === undefined ? 0 : val)
    this.left = (left === undefined ? null : left)
    this.right = (right === undefined ? null : right)
}

let tree = new TreeNode(32,
    new TreeNode(26,
        new TreeNode(19,
            undefined,
            new TreeNode(27)
        ),
        undefined
    ),
    new TreeNode(47,
        undefined,
        new TreeNode(56)
    )
)

let tree1 = new TreeNode(5,
    new TreeNode(1,
        undefined,
        undefined
    ),
    new TreeNode(4,
        new TreeNode(3),
        new TreeNode(6)
    )
)

console.log(isValidBST(tree))