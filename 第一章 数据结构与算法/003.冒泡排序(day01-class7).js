function swap(list, j) {
    const temp = list[j]
    list[j] = list[j+1]
    list[j+1] = temp
}
function bubbleSort(list) {
    for (let i = list.length - 1; i >= 1; i--) {
        for (let j = 0; j <= i; j++){
            if (list[j] > list[j+1]) swap(list, j)
        }
    }
}

const list = [1, 3, 2,7,1,0,23,76,45,97,11,33,55,11];
bubbleSort(list)
console.log(list)