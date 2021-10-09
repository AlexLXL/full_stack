/**
 * 队列
 */
class Queue {
    constructor(max) {
        this.max = max
        this.data = Array(max)
        this.head = 0
        this.tail = 0
        this.size = 0
    }
    enqueue(value) {
        if (this.size === this.max) {
            throw new Error("队列已满")
        }
        this.size++
        this.data[this.tail] = value
        this.tail === (this.max - 1) ? (this.tail = 0) : this.tail++
    }
    dequeue() {
        if (this.size === 0) {
            throw new Error("队列已空")
        }
        this.size--
        let x = this.data[this.head]
        this.head++
        return x
    }
}

let q = new Queue(2)
q.enqueue(1)
q.enqueue(2)
console.log(q.dequeue())    // OUTPUT: 1
console.log(q.dequeue())    // OUTPUT: 2