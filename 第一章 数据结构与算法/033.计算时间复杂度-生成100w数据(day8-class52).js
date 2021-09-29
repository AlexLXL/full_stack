// 生成100w长度数组
function gen(w) {
    let arr = []
    for (let i = 1; i <= w * 10000; i++) {
        arr[i] = i
    }
    // 打乱数组
    shuffle(arr)
    return arr
}

// 解1: 洗牌算法（每个数随机和后面一个数交换）
function shuffle(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let j = i + ~~(Math.random() * (arr.length - i));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
}

// 解2: sort方法(不准, 如[1,2,3,4]用该方法排序10w次，发现2出现在下标0位置的概率趋近33%，正确应该趋近25%)
function shuffleBySort(arr) {
    return arr.sort(() => Math.random() - 0.5)
}

// 解3: 添加一个同长度、填充随机值的数组A,对A进行排序(不准,同上)
function shuffleByArray(arr) {
    let m = []
    for (let i = 0; i < arr.length; i++) {
        m[i] = Math.random()
    }
    return arr.sort((i, j) => m[i] - m[j])
}


// console.log(gen(10))


// 测试函数
// 如[1,2,3,4]进行10w次排序,2出现在下标0处的次数应该趋近1/4
// function verifyFn(w) {
//     let amount = 0
//     for (let i = 0; i < 10000 * w; i++) {
//         let result = shuffleByArray([1, 2, 3, 4])
//         if (result[0] === 2) ++amount
//     }
//     console.log((amount / 10000 * w).toFixed(2))
// }
// verifyFn(10)