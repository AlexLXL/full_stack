// 问题1: 树的表示
/**
 * 树表示
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
        yield* treeTransverseMiddleGen(tree.children[i], order)
    }
    if (!middleConsole) {
        yield tree
    }
}
// 迭代生成器
// console.log([...treeTransverseMiddleGen(tree)])
/* OUTPUT:
[ Tree { v: 10, children: [ [Tree], [Tree], [Tree] ] },
  Tree { v: 5, children: null },
  Tree { v: 3, children: [ [Tree], [Tree] ] },
  Tree { v: 7, children: null },
  Tree { v: 11, children: null },
  Tree { v: 2, children: null } ]
 */


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
            yield* treeTransverseAllNodePath(tree.children[i], [...path, i])
        }
    }
}
// console.log([...treeTransverseAllNodePath(tree)])
/* OUTPUT:
[ { tree: Tree { v: 10, children: [Array] }, path: [] },
  { tree: Tree { v: 5, children: null }, path: [ 0 ] },
  { tree: Tree { v: 3, children: [Array] }, path: [ 1 ] },
  { tree: Tree { v: 7, children: null }, path: [ 1, 0 ] },
  { tree: Tree { v: 11, children: null }, path: [ 1, 1 ] },
  { tree: Tree { v: 2, children: null }, path: [ 2 ] } ]

// 11的路径就用[1, 1]表示,从10开始,第1个子树再第1个子树
 */


/**
 * ★★ 问题8: 反查节点(这里的path都是下标,而js选择器些情况含属性判断条件)
 */
function findByPath(tree, path) {
    return !path.length ? tree : findByPath(tree.children[path[0]], path.slice(1))
}
// console.log(findByPath(tree, [1, 1]))   // OUTPUT: Tree { v: 11, children: null }


/**
 * ★★ 问题9: js元素选择器
 * select("1 [>5]")   =>  参数进行标准化简 [ { child: 1 }, { op: (node) => node.v > 5 } ]
 *                  =>  OUTPUT: [7, 11]
 *
 */
function select(node, path) {
    if (path.length === 0) return [node]    // 元素选择器返回的都是数组
    let condition = path.unshift()
    if (condition.child) {
        return select(node.children[condition.child], [...path])
    } else if (condition.op) {
        // 这里好像有点多余,用node.children好像也可以,因为没有用到path属性
        // 理解错误: 上面一行误以为只有一层子节点,实际可能有多层，
        //          所以还是要用treeTransverseAllNodePath
        return [...treeTransverseAllNodePath(node)].filter(condition.op)
    }
}
function selectEasy(node, expr) {
    return select(node, parseSelectExp(expr))
}
/**
 * ★★ 问题9: js元素选择器的解析器
 */
function parseSelectExp(exps) {
    return exps.split(' ').map((exp) => {
        if (exp.match(/^\d+$/)) {
            return {child: parseInt(exp)}
        } else {
            return { op: eval(`(node) => node.v ${exp.replace(/[\[\]]/g, '')}`) }
        }
    })
}
// console.log(parseSelectExp("1 [>5]"))



// ========上面都是树的=========
// =======下面都是DOM树的=======



/**
 * ★★ DOMTree表示
 */
class DOMTree {
    constructor(tag, className, children = []) {
        this.tag = tag
        this.className = className
        this.children = children
    }
}


/**
 * ★★ 构建DOMTree
 *
 * <div>
 *     <div class="content">
 *         <table>
 *             <tr>
 *                 <td>1</td>
 *                 <td>2</td>
 *                 <td>3</td>
 *             </tr>
 *         </table>
 *     </div>
 * </div>
 */
let domTree = new DOMTree("div", '', [
    new DOMTree("div", "content", [
        new DOMTree("table", '', [
            new DOMTree("tr", '', [
                new DOMTree("td", '', null),
                new DOMTree("td", '', null),
                new DOMTree("td", '', null)
            ])
        ])
    ])
])


/**
 * ★★ 问题10: DOM树节点的遍历与查找 (这里用先序)
 */
function * DTTransverse(node) {
    yield node
    if (node.children) {
        for (let i = 0; i < node.children.length; i++) {
            yield * DTTransverse(node.children[i])
        }
    }
}
// console.log([...DTTransverse(domTree)])
/* OUTPUT:
[ DOMTree { tag: 'div', className: '', children: [ [DOMTree] ] },
  DOMTree { tag: 'div', className: 'content', children: [ [DOMTree] ] },
  DOMTree { tag: 'table', className: '', children: [ [DOMTree] ] },
  DOMTree { tag: 'tr', className: '', children: [ [DOMTree], [DOMTree], [DOMTree] ] },
  DOMTree { tag: 'td', className: '', children: null },
  DOMTree { tag: 'td', className: '', children: null },
  DOMTree { tag: 'td', className: '', children: null } ]
 */


/**
 * ★★ 问题11: DOM树查找(单个条件)
 */
function findByClassName(node, className) {
    return [...DTTransverse(node)].filter((node) => node.className === className)
}
function findByTagName(node, tagName) {
    return [...DTTransverse(node)].filter((node) => node.tag === tagName)
}
// console.log(findByClassName(domTree, "content"))
// OUTPUT: [ DOMTree { tag: 'div', className: 'content', children: [ [DOMTree] ] } ]
// console.log(findByTagName(domTree, "table"))
// OUTPUT: [ DOMTree { tag: 'table', className: '', children: [ [DOMTree] ] } ]

/**
 * ★★ 问题11: DOM树查找(单个条件)优化
 * 提前遍历生成一个class的倒排表就不用每次都[...DTTransverse(node)]迭代整个树
 */
function index(tree) {
    let classes = {}
    let nodes = DTTransverse(tree)
    nodes.forEach( node => {
        if (node.className) {
            if (!classes[node.className]) {
                classes[node.className] = []
            }
            classes[node.className].push(node)
        }
    })
    return classes
}

/**
 * ★★ 问题12: DOM树查找(多个条件)
 */
function DTSelect(node, path) {
    if (path.length === 0) return [node]
    let condition = path.shift()
    let nodes = []
    if (condition.className) {
        nodes = findByClassName(node, condition.className)
    }else if (condition.tagName) {
        nodes = findByTagName(node, condition.tagName)
    }
    return [].concat(
        ...nodes.map(n => DTSelect(n, [...path])) // 找到一层后, 继续往内部找, 然后从里到外逐层进行三点运算符解构
    )
}
function DTSelectEasy(node, exps) {
    return DTSelect(node, DTParseSelectExp(exps))
}
console.log(DTSelectEasy(domTree, ".content tr td"))
/* OUTPUT:
[ DOMTree { tag: 'td', className: '', children: null },
  DOMTree { tag: 'td', className: '', children: null },
  DOMTree { tag: 'td', className: '', children: null } ]
 */
/**
 * ★★ 问题12: DOM树查找(多个条件)的解析器
 */
function DTParseSelectExp(exps) {
    return exps.split(" ").map((exp) => {
        if (exp[0] === '.') {
            return { className: exp.substr(1) }
        }else {
            return { tagName: exp }
        }
    })
}