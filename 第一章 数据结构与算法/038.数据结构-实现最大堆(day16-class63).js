/**
 * Heap: 堆，结构属于完全二叉树
 * 分为两种: 最大堆和最小堆
 */
function left(i) { return i * 2 + 1 }
function right(i) { return i * 2 + 2 }
function swap(A, i, j) {
    let temp = A[i]
    A[i] = A[j]
    A[j] = temp
}

/**
 * 最大堆
 */
class Heap {
    constructor(arr) {
        this.data = [...arr]
        this.size = this.data.length
    }

    /**
     * 重构整个堆,[1,2,3,4,5]
     *      1             1            5            5
     *    2   3   ->    5   3  ->    1  3  ->     4  3
     *  4  5          4  2          4 2          1 2
     */
    rebuildHeap() {
        // 叶子节点序号 >= ~~(this.size/2)
        let leaf = ~~(this.size/2)
        for (let i = leaf - 1; i >= 0; i--) {
            this.maxHeapify(i)
            // console.log(`重构堆: ${this.data}`)
        }
    }

    /**
     * 是否最大堆
     * @returns {boolean}
     */
    isMaxHeap() {
        let leaf = ~~(this.size/2)
        for (let i = 0; i < leaf; i++) {
            let l = this.data[ left(i) ] || Number.MIN_SAFE_INTEGER
            let r = this.data[ right(i) ] || Number.MIN_SAFE_INTEGER
            let max = Math.max(this.data[i], l, r)
            if (max !== this.data[i]) {
                return false
            }
            return true
        }
    }

    /**
     * 排序
     */
    sort() {
        for (let i = this.size - 1; i > 0; i--) {
            // 把最大值放最后,随机值放前面
            // 且this.size--,maxHeapify在判断有没值的时候就会为否
            swap(this.data, 0, this.size - 1)
            this.size--
            this.maxHeapify(0)
        }
    }

    /**
     * 假设堆其他地方满足性质，唯独i节点需要重构堆性质
     * @param i 节点i
     */
    maxHeapify(i) {
        if (i >= this.size) { return }

        let max = i
        let l = left(i)
        let r = right(i)

        if (l < this.size && this.data[l] > this.data[max]) {
            max = l
        }

        // 如果上面if成立,这里比较的是左右两值；如果上面if不成立，比较的是上和右下两值
        if (r < this.size && this.data[r] > this.data[max]) {
            max = r
        }
        
        if (max === i) { return }

        swap(this.data, i, max)
        // console.log(`交换细节: ${this.data}、i=${i}、max=${max}`)
        this.maxHeapify(max)
    }
}

/**
 * 测试
 */
let heap01 = new Heap([15, 2, 8, 12, 5, 2, 3, 4, 7])
heap01.maxHeapify(1)
console.log(heap01.data)  // OUTPUT: [ 15, 12, 8, 7, 5, 2, 3, 4, 2 ], 变为最大堆

let heap02 = new Heap([15])
heap02.maxHeapify(0)
console.log(heap02.data)  // OUTPUT: [ 15 ]

let heap03 = new Heap([1, 2, 3, 4, 5])
heap03.rebuildHeap()
console.log(heap03.data)  // OUTPUT: [ 5, 4, 3, 1, 2 ]

let heap04 = new Heap([ 15, 12, 8, 7, 5, 2, 3, 4, 2 ])
console.log(heap04.isMaxHeap()) // OUTPUT: true
let heap05 = new Heap([ 15, 17, 8, 7, 5, 2, 3, 4, 2 ])
console.log(heap05.isMaxHeap()) // OUTPUT: false