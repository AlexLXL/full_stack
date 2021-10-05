/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 * 执行用时：68 ms, 在所有 JavaScript new Set提交中击败了92.22%的用户
 * 内存消耗：39.8 MB, 在所有 JavaScript 提交中击败了39.68%的用户
 */
var twoSum = function(nums, target) {
    let set = new Set()
    let setIdx = new Set()
    for(let i = 0; i < nums.length; i++) {
        let prop = nums[i]
        if (set.has(prop)) {
            let ids = Array.from(setIdx)[Array.from(set).indexOf(prop)]
            if(ids !== i) {
                return [ids, i]
            }
        }else {
            if (!set.has(target - prop)) {
                setIdx.add(i)
            }
            set.add(target - prop)
        }
    }
};

console.log(twoSum([1,1,1,1,1,4,1,1,1,1,1,7,1,1,1,1,1], 11))