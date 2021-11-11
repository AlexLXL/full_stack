Promise.resolve().then(() => {
    console.log(0)
    return Promise.resolve(4)  // 返回值是promise, 内部会调一下这个promise.then(), 然后帮你返回一个内部生成的promise,
}).then((res) => {
    console.log(res)
})

Promise.resolve().then(() => {
    console.log(1)
}).then(() => {
    console.log(2)
}).then(() => {
    console.log(3)
}).then(() => {
    console.log(5)
})

// 0,1,2,3,4,5
// ecmascript规范中, 返回promise, 他不会立即执行, 会将这个promise又放到异步方法中进行处理(生成新的一个微任务)

// [-r1, -r2, -r3x, r4, r5]
