type Sum = (a: number, b: number) => number
let sum01: Sum = function (v1, v2) {    // 1.使用type
    return v1 + v2
}

function sum02(v1: number, v2: number): number {    // 2.直接指定
    return v1 + v2
}

function sum03(v1: number, v2?: number): number {   // 3.可选参数
    return v1
}

function sum04(v1: number, v2: number = 2): number {    // 4.参数默认值
    return v1 + v2
}

function sum05(...args: number[]): number { // 5.三点运算符
    return 0
}

function callThis(this: string): void {   // 6.标识函数的this类型
    console.log(this)
}

function toArray(val: string): string[] // 7.函数限制（返回对应类型）
function toArray(val: number): number[]
function toArray(val: string | number): string[] | number[] {
    if (typeof val === 'string') {
        return val.split('')
    }else {
        return val.toString().split('').map(item => +item)
    }
}
let arr = toArray(123)

export default {}