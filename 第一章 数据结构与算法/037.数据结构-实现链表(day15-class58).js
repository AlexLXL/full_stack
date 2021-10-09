/**
 * 双向链表
 */
class ListNode {
    constructor(key) {
        this.prev = null
        this.next = null
        this.key = key
    }
}
class List {
    constructor() {
        this.head = null
    }
    insert(node) {
        node.prev = null
        node.next = this.head
        if (this.head) {
            this.head.prev = node
        }
        this.head = node
    }
    search(key) {
        let node = this.head
        while (node !== null && node.key !== key) {
            node = node.next
        }
        return node
    }
    delete(node) {
        let { prev, next } = node
        delete node.prev
        delete node.next
        if (node === this.head) this.head = next
        prev && (prev.next = next)
        next && (next.prev = prev)
    }
}

let l1 = new List()
let n1 = new ListNode(89)
let n2 = new ListNode(88)
let n3 = new ListNode(87)
l1.insert(n1)
l1.insert(n2)
l1.insert(n3)
// console.log(l1)
console.log(l1.search(88))