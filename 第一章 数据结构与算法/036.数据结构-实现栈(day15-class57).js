/**
 * 堆栈
 */
class Stack {
    constructor(max) {
        this.data = Array(max)
        this.top = -1
        this.max = max
    }
    push(value) {
        this.top++
        this.data[this.top] = value
    }
    pop() {
        const x = this.data[this.top]
        this.top--
        return x
    }
}

let s = new Stack(10)
s.push(1)
s.push(2)
s.push(3)
console.log(s)  // OUTPUT: Stack { data: [ 1, 2, 3, <7 empty items> ], top: 2, max: 10 }
console.log(s.pop())    // OUTPUT: 3
console.log(s.pop())    // OUTPUT: 2
console.log(s.pop())    // OUTPUT: 1
