// 例1
class Dog {
    constructor(public name: string, public age: number) {
    }
}
class Cat {
    constructor(public name: string, public age: number) {
    }
}
interface IAbstractType<T> {
    new(name: string, age: number): T
}
function createInstance<T>(clazz: IAbstractType<T>, name: string, age: number) {
    return new clazz(name, age)
}
let d = createInstance(Dog, 'husky', 2) // 类型推导为Dog
let c = createInstance(Cat, 'husky', 2) // 类型推导为Cat
let c2 = createInstance<Cat>(Dog, 'husky', 2) // 主动传泛型,所以编辑器推断为Cat, 但实际编译成的还是Dog


// 例2
function createArray<T>(len: number, v: T): T[] {
    let result = []
    for (let i = 0; i < len; i++) {
        result.push(v)
    }
    return result
}
let arr1 = createArray(3, 1)
let arr2 = createArray(3, '1')
// let arr3 = createArray<string | number>(3, 1)


// 例3
function swap<T, E>([v1, v2]: [T, E]): [E, T] {
    return [v2, v1]
}
let arr = swap(['a', 1])


// 例4: 注意点<T>放前方后(放后会无法推断类型)
type Tfn<T> = (item: T, index: number) => void  // 放前[执行前]
interface Ifn<T> {
    (item: T, index: number): void
}
let forEach = <T>(arr: T[], fn: Tfn<T>) => {    // 下面执行的时候才能拿到T
    for (let i = 0; i < arr.length; i++) {
        fn(arr[i], i)
    }
}
// type Tfn = <T>(item: T, index: number) => void   // 放后[执行时]
// interface Ifn {
//     <T>(item: T, index: number): void
// }
// let forEach = <T>(arr: T[], fn: Tfn) => {
//     for (let i = 0; i < arr.length; i++) {
//         fn<T>(arr[i], i)
//     }
// }
forEach([1, 2], function (item) {
    console.log(item)
})

// 例5: 在函数中有时重载比泛型更方便（对应 '002.函数的类型.ts' 的toArray）

// 例6: 泛型约束（约束传入的值）
function finish<T extends {name: string}>(v: T) {}
finish({name:'1', age: 2})

function getValue<T extends object, E extends keyof T>(obj: T, k: E) {}
// getValue({a: 1, b: 2}, 'c') // 因为没有c会报错

// 例7: 默认泛型
type MType<T = string> = {name: T}
type MType01 = MType<number>
type MType02 = MType


export default {}

// 不传的泛型，会根据位置推断类型★★★[看 '007.内置类型.ts' 的Record]