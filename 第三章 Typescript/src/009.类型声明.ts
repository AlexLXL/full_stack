// 从安全性考虑类型可以怎么兼容

/**
 * 变量类型兼容
 */
let t1!: string | number
let t2!: string | number | boolean
// t1 = t2  // 不行
t2 = t1


/**
 * 接口类型兼容
 */
interface I1 {
    a: string
    b: number
}

interface I2 {
    a: string
    b: number
    c: boolean
}

let a1!: I1
let a2!: I2
a1 = a2
// a2 = a1  // 不行

/**
 * 函数类型兼容
 */
let fn1 = (v1: string) => {}
let fn2 = (v1: string, v2: string) => {}
// fn1 = fn2   // 不行
fn2 = fn1

/**
 * 类类型兼容
 * ● 如果有private、protect不兼容
 */
class Person {
    name = 1
}
class Animal {}
let p!: Person
let a!: Animal
a = p
// p = a    // 不行

/**
 * 枚举类型不兼容
 */
enum E1{}
enum E2{}
let e1!: E1
let e2!: E2
// e1 = e2  // 不行
// e2 = e1  // 不行


/**
 * 类型的逆变和协变:
 * 场景: 函数A作为参数传给函数B; A的参数是逆变的, 返回值是协变的
 * 当tsconfig.json配置strict改为false就不检测
 */
class GrandParent {
    old!: boolean
}
class Parent extends GrandParent {
    strong!: boolean
}
class Son extends Parent {
    young!: boolean
}
function fn(cb: (p: Parent) => Parent) {}
fn((v: GrandParent) => new Son())

// 理解★★
function fn02(cb: (p: Parent) => Parent) {  // 1.参数允许传Parent和Son
    cb(new Son())
    // 3.尴尬的事情来了,这里就只能传Son;
    // 但我们是怎么定义的?是可以传Parent以下的对吧,你就会发现传参范围和自己定义的不同了,这小屁孩偷偷变窄了
}
fn02((v: GrandParent) => new Son())   // 2.假如这里type不是逆变,你这里传Son


export default {}