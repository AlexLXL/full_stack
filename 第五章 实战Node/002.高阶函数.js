/**
 * 高阶函数
 *      - 一个函数的参数是函数 如: new Promise(resolve, reject), 回调函数
 *      - 一个函数返回一个函数 如: 柯里化、偏函数
 */

/**
 * 柯里化
 * n个参数拆分成n个函数接收
 *
 * 如: add(1,2,3) =柯里化后变为=>  add(1)(2)(3)
 */
function curring(fn) {
    let args = []
    let inner = (arr = []) => {
        args.push(...arr)
        // args.splice(0, args.length) 1.传参给fn 2.清空数组,不然无法调用多次
        return args.length >= fn.length ? fn(...args.splice(0, args.length)) : (...args) => inner(args)
    }
    return inner()
}
function add(v1, v2, v3) { console.log(v1, v2, v3) }
let curringAdd = curring(add)
curringAdd(10)(19)(20)  // OUTPUT: 10 19 20
curringAdd("tom", 19)("apple")  // OUTPUT: tom 19 apple

// 应用: 封装函数、添加默认参数、延迟执行(前面收集参数, 最后不传参的时候触发函数调用)
function isType(type, val) {
    return Object.prototype.toString.call(val) === `[object ${type}]`
}
let isString = curring(isType)('string')
let isNumber = curring(isType)('number')


function currying2(fn1, fn2) {
    return function(list) {
        return fn1(fn2, list)
    }
}
function map(handler, list) { return list.map(handler) }
function square(i) { return i * i; }
function double(i) { return i * 2; }
let mapSQ = currying2(map, square);
let mapDB = currying2(map, double);
console.log(mapSQ([1, 2, 3, 4, 5])) // [ 1, 4, 9, 16, 25 ]
console.log(mapDB([1, 2, 3, 4, 5])) // [ 2, 4, 6, 8, 10 ]


/**
 * 偏函数
 * n个参数拆分成n个以内函数接收
 *
 * 如: add(1,2,3) =柯里化后变为=>  partial(add, 1)(2,3)
 */
function partial(fn, ...wrapArgs) {
    let raw = wrapArgs.slice()
    let inner = (arr = []) => {
        wrapArgs.push(...arr)
        if (wrapArgs.length >= fn.length) {
            fn(...wrapArgs)
            wrapArgs = raw
        }else {
            return (...args) => inner(args)
        }
    }
    return inner()
}
function ajax(url, data, cb) { console.log(url, data, cb) }
let ajaxOmit = partial(ajax, 'http://120.79.201.10:9000/', 'data00')
ajaxOmit('cb1') // http://120.79.201.10:9000/ data00 cb1
ajaxOmit('cb2') // http://120.79.201.10:9000/ data00 cb2