let fs = require("fs")
let numberStr = fs.readFileSync("./data/10w.data", "utf-8")
let insertSort = require("./034.计算时间复杂度-插入排序(day9-class53)")    // 时间复杂度高,O(n^2)
let mergeSort = require("./034.计算时间复杂度-归并排序(day11-class53)")    // 空间复杂度高,O(NlgN)
let qSort = require("./034.计算时间复杂度-快速排序(day11-class53)")        // 时间复杂度O(NlgN)、空间复杂度都较均衡
let numbers = numberStr.split("\n")

console.time("sort_time")
// numbers.sort((a, b) => a - b)   // 147.455ms
// insertSort(numbers)             // 131044.524ms
// mergeSort(numbers, 0, numbers.length)   // 117.486ms
// qSort(numbers, 0, numbers.length)       // 125.928ms
console.timeEnd("sort_time")

