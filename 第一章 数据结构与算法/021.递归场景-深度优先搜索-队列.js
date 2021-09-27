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
 * 深度优先搜索(dfs)算法-使用队列
 * @param node 节点
 */
function dfs(node) {
    let stack = [node]
    while (stack.length) {
        let first = stack.pop()
        console.log(first.key)
        first.children.slice().reverse().forEach((item) => {
            stack.push(item)
        })
    }
}
dfs(n1)
// OUTPUT: 1,2,3,4,5,6

/**
 * 递归-天生的深度优先搜索(dfs)算法-使用队列
 * 所以递归从数据结构来说也是使用队列
 * @param node
 */
function dfs(node) {
    console.log(node.key)
    node.children.forEach(dfs)
}
dfs(n1)
// OUTPUT: 1,2,3,4,5,6