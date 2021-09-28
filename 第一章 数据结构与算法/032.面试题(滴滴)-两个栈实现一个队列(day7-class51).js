/**
 * 问题: 两个栈实现一个队列
 *
 * 分析问题:
 *  1.特性:
 *      栈-先进后出
 *      队列-先进先出
 *  2.题目既然是两个栈,那肯定两个都用了
 *  3.尝试先填满栈1 [1,2,3,4]
 *  4.我们想  队列执行dequeue  时先返回1,联想到反转数组
 *  5.通过栈1来反转, 然后就能1先出来
 */


class Queue {
    constructor() {
        this.s1 = []
        this.s2 = []
    }
    // 入队列
    enqueue(item) {
        this.s1.push(item)
    }
    // 出队列
    dequeue() {
        let r = null
        while (this.s1.length) {
            this.s2.push(this.s1.pop())
        }
        if (this.s2.length) {
            r = this.s2.pop()
        }
        while (this.s2.length) {
            this.s1.push(this.s2.pop())
        }
        return r
    }
}

let q = new Queue();
q.enqueue(1)
q.enqueue(2)
console.log(q.dequeue())    // OUTPUT: 1
q.enqueue(3)
console.log(q.dequeue())    // OUTPUT: 2