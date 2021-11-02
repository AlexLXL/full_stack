export default {}

let str: string = 'abc'
let num: number = 123
let boo: boolean = true
let tuple: [string, number, boolean] = ['abc', 123, true]   // 元组
let arr1: number[] = [1] // 数组
let arr2: (number|string)[] = [1, '1'] // 数组
let arr3: Array<(number|string)> = [2, '2'] // 数组

console.log(str, num, boo, tuple, arr1, arr2, arr3)


enum AUTH { // 枚举
    admin = 1,
    user = 2
}
console.log(AUTH.admin, AUTH[1])
// let account: AUTH = AUTH.admin

const enum COLOR {    // 常量枚举(不会生成对象,不能反举)
    red,
    blue
}
console.log(COLOR.red)

function open(): void { // void（undefined或null）
    return undefined
}

/**
 * never: 永远不-程序无法到达
 * 1.死循环、抛错误
 * 2.判断
 * 3.特殊处理
 */
function throwErrow(): never {
    // while(true) {}
    throw new Error()
}

/**
 * Symbol 唯一值
 */
let s1: symbol = Symbol()



// ==============================================
// 断言
// let ele = document.getElementById("app")
// ele!.style.color = 'red'    // 非空断言
// (ele as HTMLElement).style.color // 强制断言



// ==============================================
// let other: number | string = 1

// ele?.style.color   // 只能取值
// let num1= 0 ?? 2    // 0
// let num2= null ?? 2 // 2
// let num3= undefined ?? 2 // 2

// type FRUIT = 'apple' | 'orange'; // type类型
// let apple: FRUIT = 'apple'

// type Sum = (a: number, b: number) => number
// let sum: Sum = function (v1, v2) {
//     return v1 + v2
// }