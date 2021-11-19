/**
 * 判断一个数是否是素数(质数)
 * @param n
 * @returns {boolean}
 */
let total = 0
function isPrime(n) {
    if (n <= 1) {
        return false
    }
    let N = Math.floor(Math.sqrt(n))
    for (let i = 2; i <= N; i++) {
        // total++
        if (n % i === 0) {
            return false
        }
    }
    return true
}


/**
 * 打印10000以内素数
 * isPrime(i)的for循环运行次数,117526次
 */
// for (let i = 2; i < 10000; i++) {
//     if (isPrime(i)) {
//         console.log(i)
//     }
// }
// console.log(total)


/**
 * 筛选素数,执行次数更多, 776630次
 *          2,3,4,5,6,7,8,9,10,11,12,13,14,15
 * 筛掉2  => 3,5,7,9,11,13,15
 * 筛掉3  => 5,7,11,13
 * 筛掉5  => 7,11,13
 * 筛掉7  => 11,13
 * 筛掉11 => 13
 * 筛掉13 => 结束
 * 前面这一列就是素数
 *
 * @param n
 */
function* sievePrime(n) {
    let seriesArray = Array.from({ length: n - 2 }, (_, i) => i + 2)
    let p = null
    while (p = seriesArray.shift()) {
        seriesArray = seriesArray.filter(v => {
            // total++
            return v % p !== 0
        })
        yield p
    }
}
// 循环迭代器
// 方式1:
// console.log([...sievePrime(10000)])
// 方式2:
// for (let v of sievePrime(10000)) {
//     console.log(v)
// }
// 方式3:
// let it = sievePrime(10000)
// while(!(it.next()).done) {
//     // --snip--
// }
// console.log(total)  // OUTPUT: 776630



/**
 * 总结:
 * 1.yield简化语法、写起来少考虑一些问题★
 * 2.循环数组且过程中会修改数组的，可以使用while★★
 */

// 生成下标数组
// Array.from({length: 10}, (_, i) => i)
// Array(10).fill(0).map((_, i) => i)
// [...Array(10).keys()]


// 执行顺序问题
create_runner(
    function *() {
        let valOne = yield request("some url")  // 2.2跑到这里执行require
        console.log(valOne)
        let valTwo = yield request("some url")
        console.log(valTwo)
    }
)()

/**
 * 这个函数来不断迭代传入的生成器
 * @param genFunc
 * @returns {run}
 */
function create_runner( genFunc ) {
    // 1.生成迭代器
    let it = genFunc()

    // 2.执行函数
    function run(data) {
        // 2.1迭代下一项
        let itVal = it.next(data)   // 3.第二次执行next,把data的值返回给上一个阻塞的yield
        // 2.4itVal = {value: cb => {...}, done: false}
        if (!itVal.done) {
            // 2.5执行函数A, 将run作为cb传入给A
            itVal.value(run)
        }
    }

    return run
}

function request(url) {
    // 2.3跑到返回函数A
    return cb => {
        setTimeout(() => {
            cb(Math.random())
        }, 0)
    }
}

