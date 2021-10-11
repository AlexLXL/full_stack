function deepCompare(a, b) {
    if (a === null || typeof a !== "object"
        || b === null || typeof b !== "object") {
        return a === b
    }

    let propsA = Object.getOwnPropertyDescriptors(a)
    let propsB = Object.getOwnPropertyDescriptors(b)
    if (Object.keys(propsA).length !== Object.keys(propsB).length) {
        return false
    }
    return Object.keys(propsA).every(
        key => deepCompare(a[key], b[key]))
}

let dataOne = {a: "a", b: { bb: "bb" }}
let dataTwo = {a: "a", b: { bc: "bb" }}
console.log(deepCompare(dataOne, dataTwo))  // OUTPUT: false

let dataThree = [{a: 1}, 2]
let dataFour = [{a: 2}, 2]
console.log(deepCompare(dataThree, dataFour))  // OUTPUT: false
