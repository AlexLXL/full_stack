### 公司面试第一题(获取随机字符串里)

```
let randomStr = "dasdautedasdarwebvbnvsdnbaxfcghzfcghzdsadasdautehjkhkxnjkahdsadasdautehjkhkxnjkahdsahjkhkxnjkahdsa"

// 原解法
function countByHashTable(str) {
    let counter = {}
    for (let v of str) {
        counter[v] ? counter[v]++ : (counter[v] = 1)
    }
    // 方案1: 遍历(时间复杂度nlogn, ≈3.1ms)
    let result = ""
    for (let [k,v] of Object.entries(counter)) {
        result += `${k}:${v}, `
    }
    return result

    // 方案2: 直接转JSON,把两边括号去掉,(时间复杂度nlogn, ≈3.2ms)
    // let result = JSON.stringify(counter).slice(1,-1)
    // return result
}
console.time("timeOne")
console.log(countByHashTable(randomStr))
console.timeEnd("timeOne")
// OUTPUT: 3.254ms


// 优化解法
function countByUint16Array(str) {
    let counter = new Uint16Array(26),
        i = str.length
    while(i--) {
        counter[str.charCodeAt(i) - 97]++
    }
    return counter.reduce((total, v, i) => {
        return v ? (total += `${String.fromCharCode(i + 97)}:${v}, `) : total
    }, "")
}
console.time("timeTwo")
console.log(countByUint16Array(randomStr))
console.timeEnd("timeTwo")
// OUTPUT: 0.749ms
```