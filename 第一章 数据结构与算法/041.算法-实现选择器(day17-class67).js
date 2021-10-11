// 问题1: 树的表示
/**
 * 树Class
 */
class Tree {
    constructor(v, children) {
        this.v = v
        this.children = children || null
    }
}



/**
 * 构建树:
 *          10
 *    5     3    2
 *        7  11
 */
let tree = new Tree(10, [
    new Tree(5),
    new Tree(3, [new Tree(7), new Tree(11)]),
    new Tree(2)
])



/**
 * ★★ 递归的顺序是不变的,通过代码来控制先序、后序、中序
 * ★★ 问题2: 树的遍历(先序) (根、左下、右下的顺序)
 * OUTPUT: [10, 5, 3, 7, 11, 2]
 */
function treeTransverse(tree) {
    console.log(tree.v)
    tree.children && tree.children.forEach(treeTransverse)
}
// treeTransverse(tree)



/**
 * ★★ 问题3: 树的遍历(后序) (左下、右下、根的顺序)
 * OUTPUT: [10, 5, 3, 7, 11, 2]
 */
function treeTransverseLast(tree) {
    tree.children && tree.children.forEach(treeTransverseLast)
    console.log(tree.v)
}
// treeTransverseLast(tree)



/**
 * ★★ 问题4: 树的遍历(中序) (左下、根、右下的顺序)
 * OUTPUT: [5, 10, 7, 3, 11, 2], order为1时
 * 前序好后序都是中序的两种边界
 */
function treeTransverseMiddle(tree, order) {
    // 简化一下问题, order为1时,在循环子树时，如果遇到下标为1，就去打印父节点
    // 5 (10) 3 2
    let middleConsole = false
    if (tree.children === null) {
        console.log(tree.v)
        return
    }
    tree.children.forEach((child, i) => {
        if (i === order) {
            middleConsole = true
            console.log(tree.v)
        }
        treeTransverseMiddle(child, order)
    })
    !middleConsole && console.log(tree.v)    // 用于后序时
}
// treeTransverseMiddle(tree, 1)   // OUTPUT: [5, 10, 7, 3, 11, 2]
// treeTransverseMiddle(tree, 0)   // OUTPUT: [10, 5, 3, 7, 11, 2]
// treeTransverseMiddle(tree, Number.MAX_SAFE_INTEGER)   // OUTPUT: [5, 7, 11, 3, 2, 10]
// 添加回调
function treeTransverseMiddle02(tree, order, callback) {
    // 简化一下问题, order为1时,在循环子树时，如果遇到下标为1，就去打印父节点
    // 5 (10) 3 2
    let middleConsole = false
    if (tree.children === null) {
        callback(tree.v)
        return
    }
    tree.children.forEach((child, i) => {
        if (i === order) {
            middleConsole = true
            callback(tree.v)
        }
        treeTransverseMiddle(child, order)
    })
    !middleConsole && callback(tree.v)    // 用于后序时
}


/**
 * ★★ 问题5: 树的遍历(中序) 改为Generator
 * a,把console改为yield
 * b,把forEach改为for,才能支持yield语法
 */
function* treeTransverseMiddleGen(tree, order = 0) {
    let middleConsole = false
    if (tree.children === null) {
        yield tree
        return
    }
    // forEach不能
    for (let i = 0; i < tree.children.length; i++) {
        if (i === order) {
            middleConsole = true;
            yield tree
        }
        yield *treeTransverseMiddleGen(tree.children[i], order)
    }
    if (!middleConsole) {
        yield tree
    }
}
// 迭代生成器
// console.log([...treeTransverseMiddleGen(tree)])
// OUTPUT:
// [ Tree { v: 10, children: [ [Tree], [Tree], [Tree] ] },
//   Tree { v: 5, children: null },
//   Tree { v: 3, children: [ [Tree], [Tree] ] },
//   Tree { v: 7, children: null },
//   Tree { v: 11, children: null },
//   Tree { v: 2, children: null } ]


/**
 * ★★ 问题6: 树的查找
 */
function find01(tree, prediction) {
    return [...treeTransverseMiddleGen(tree)].find(prediction)
}
function find02(tree, prediction) {
    for (let node of treeTransverseMiddleGen(tree)) {
        if (prediction(node)) {
            return node
        }
    }
    // 开销更小, 不会迭代完所有值
}
// console.log(find01(tree, node =>  node.v === 11))
// console.log(find02(tree, node =>  node.v === 11))
// OUTPUT: Tree { v: 11, children: null }


/**
 * ★★ 问题7: 获取树所有节点的路径
 */
function* treeTransverseAllNodePath(tree, path = []) {
    yield {tree, path}
    if (tree.children) {
        for (let i = 0; i < tree.children.length; i++) {
            yield *treeTransverseAllNodePath(tree.children[i], [...path, i])
        }
    }
}
// console.log([...treeTransverseAllNodePath(tree)])
// OUTPUT:
// [ { tree: Tree { v: 10, children: [Array] }, path: [] },
//   { tree: Tree { v: 5, children: null }, path: [ 0 ] },
//   { tree: Tree { v: 3, children: [Array] }, path: [ 1 ] },
//   { tree: Tree { v: 7, children: null }, path: [ 1, 0 ] },
//   { tree: Tree { v: 11, children: null }, path: [ 1, 1 ] },
//   { tree: Tree { v: 2, children: null }, path: [ 2 ] } ]
// 11的路径就用[1, 1]表示,从10开始,第1个子树再第1个子树


/**
 * ★★ 问题8: 反查节点
 */
function findByPath(tree, path) {
    return !path.length ? tree : findByPath(tree.children[path[0]], path.slice(1))
}
console.log(findByPath(tree, [1, 1]))   // OUTPUT: Tree { v: 11, children: null }