/**
 * interface: 用于描述对象
 */


// 1.type和interface
// type Sum = ((v1: number, v2: number) => number) | ((v1: string,  v2: string) => string)  // 联合类型时用
interface ISum {
    (v1: number, v2: number): number
}
let sum: ISum = (v1, v2  ) => v1 + v2


// 2.基础使用
// 注意点:给fn扩展属性的时候使用const
interface ICounter {
    count: number
    (): number
}
const counter: ICounter = () => ++counter.count
counter.count = 0
counter();


// 3.描述后台接口返回的字段
interface IFruit {
    name: string
    price?: number
    // [prop:string]: any   // 3.1扩展字段
}

let apple: IFruit = {
    name: "苹果",
}

let appleStrange: IFruit = {
    name: "奇怪的苹果",
    name02: '我多了一个字段'
} as IFruit
// 3.2 多了字段强转

// 3.3 扩展字段
interface IPeachFruit extends IFruit {
    color: string
}
let peach: IPeachFruit = {
    name: "桃子",
    price: 5,
    color: 'red'
}

// 3.4 满足条件就可以赋值
let fruit: IFruit = peach

console.log(apple)
console.log(appleStrange)
console.log(peach)
console.log(fruit)

// 4.接口的交集
// 交集出来的东西即满足A,又满足B
interface A {
    hasHand: string
}
interface B {
    hasFoot: string
}
type P = A & B  // (与运算是同1才是1，所以是交集; 或运算是有1就是1,所以是并集)
let person: P = {
    hasHand: '1',
    hasFoot: '1',
    // hashead: '1'
}

function mixin<T extends object, E extends object>(o1: T, o2: E) {
    return {...o1, ...o2}
}
let r1 = mixin({a: 1}, {a: 'aa', b: 'bb'})
console.log(r1) // {a: 'aa', b: 'bb'}

export default {}