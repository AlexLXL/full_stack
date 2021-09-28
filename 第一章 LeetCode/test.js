var containsDuplicate = function(nums) {
    let o = {}
    let flag = false
    for(let i = 0; i < nums.length; i++) {
        let k = nums[i].toString()
        if(o[k]) {
            flag = true
        }else {
            o[k] = 1
        }
    }
    console.log(o)
    return flag
};

containsDuplicate([1,2,1])