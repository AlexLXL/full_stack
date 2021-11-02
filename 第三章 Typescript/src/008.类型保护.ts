/**
 * 自定义类型
 */

/**
 * 求不同 (取T的)
 */
let p1 = { name: 'z1', age: 12, sex: 'man' }
let p2 = { name: 'z2' }
type p1Type = typeof p1
type p2Type = typeof p2
type Diff<T extends object, U extends object> = Omit<T, keyof U>
type DiffType = Diff<p1Type, p2Type>

/**
 * 求同 (取T的)
 */
type Inter<T extends object, U extends object> = Pick<T, Extract<keyof T, keyof U>>
type InterType = Inter<p1Type, p2Type>

/**
 * 合并两个对象 (后覆盖前)
 */
let p3 = { name: 'z1', age: 12, sex: 'man' }
let p4 = { name: 'z2', age: '12' }
type p3Type = typeof p3
type p4Type = typeof p4
type Merge<T extends object, U extends object> = Omit<T, keyof U> & U
type computed<T> = {[k in keyof T]: T[k]}
type MergeType = computed<Merge<p3Type, p4Type>>

/**
 * '第2个' 重写 '第1个' 重复那部分 (后覆盖前)
 */
let p5 = { name: 'z1', age: 12}
let p6 = { age: '12', sex: 'man'  }
type p5Type = typeof p5
type p6Type = typeof p6
type OverWrite<T extends object, U extends object> = Omit<T, keyof U> & Inter<U, T>
type OverWriteType = computed<OverWrite<p5Type, p6Type>>


/**
 * 类型保护
 * 更好地区识别类型
 */
/**
 * js的typeof instanceof in
 */
function getV1(v: string | number) {
    if (typeof v === 'string') {
        // --snip--
    }else {
        // --snip--
    }
}

class Animal {}
class Fruit {}
function getV2(v: Animal | Fruit) {
    if (v instanceof Animal) {
        // --snip--
    }else {
        // --snip--
    }
}

interface Fish { kind: '鱼', swim: string }
interface Bird { kind: '鸟', fly: string }
function getV3(v: Fish | Bird) {
    if ('swim' in v) {
        // --snip--
    }else {
        // --snip--
    }
}

/**
 * ts语法: x is XX、never进行完整性保护
 */
function getV4(v: Fish | Bird) {
    if (isFish(v)) {
        console.log(v)
    }else {
        console.log(v)
    }
}
function isFish(v: Fish | Bird): v is Fish {
    return v.kind === '鱼'
}

interface ICircle { kind: 'circle' }
interface IRectangle { kind: 'rectangle' }
interface ISquare { kind: 'ISquare' }
function getArea(shape: ICircle | IRectangle | ISquare) {
    switch (shape.kind) {
        case "circle":
            break;
        case "ISquare":
            break;
        case "rectangle":
            break;
        default:
            assert(shape)   // 如果上面漏泄了一个，这里就会报错。常用!
            break;
    }
}
function assert(obj: never) {}

export default {}