class  Animal {
    constructor() {
        this.data = {
            a:1,
            b:2
        }
    }
    add() {
        console.log(this)
    }
}

// let a1 = new Animal()
// let a2 = new Animal()
// a1.data.a = 2
// console.log(a1.data)
// console.log(a2.data)

let a1 = new Animal()
let a = a1.add
a()

