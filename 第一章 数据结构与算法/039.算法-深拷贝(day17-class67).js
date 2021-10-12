function deepClone(obj) {
    if (obj === null || typeof obj !== "object") return obj
    let newObj = null
    if (obj.constructor === Date) {
        newObj = new obj.constructor(obj)
    }else {
        newObj = new obj.constructor()
    }
    for (let key in Object.getOwnPropertyDescriptors(obj)) {
        newObj[key] = deepClone(obj[key])
    }
    return newObj
}

let person = {
    name: "alex",
    age: 18,
    account: {
        a: [1,2,3],
        b: true,
        c: {cc: "cc"}
    }
}
let personClone = deepClone(person)
person.account.a = [1,2]
console.log(person)
console.log(personClone)
// OUTPUT: { name: 'alex', age: 18, account: { a: [ 1, 2 ], b: true, c: { cc: 'cc' } } }
// OUTPUT: { name: 'alex', age: 18, account: { a: [ 1, 2, 3 ], b: true, c: { cc: 'cc' } } }

let queue = [1, {a: "a"}, [true, false]]
let queueClone = deepClone(queue)
queue[1].a = 2
console.log(queue)      // OUTPUT: [ 1, { a: 2 }, [ true, false ] ]
console.log(queueClone) // OUTPUT: [ 1, { a: 'a' }, [ true, false ] ]