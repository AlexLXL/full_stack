/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 思路一: 利用hashMap(即js的对象)，只需要两次循环
 1.循环nums1,统计每个出现的次数，存储在hashmap中
 2.循环nums2,如果hashmap中有值且大于0,hashmap的值减1,并存入result

 */
var intersect = function(nums1, nums2) {
    let amount = {}
    let result = []
    for (let i = 0; i < nums1.length; i++) {
        amount[nums1[i]] ? amount[nums1[i]]++ : amount[nums1[i]] = 1
    }
    for (let j = 0; j < nums2.length; j++) {
        if(amount[nums2[j]] > 0) {
            result.push(nums2[j])
            amount[nums2[j]]--
        }
    }
    return result
};

console.log(intersect([9, 4, 9, 5], [9, 4, 1, 4, 9]))