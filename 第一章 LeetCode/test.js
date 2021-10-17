var strStr = function(haystack, needle) {
    if(needle === "") { return 0 }
    let hLen = haystack.length
    let nlen = needle.length
    for(let i = 0, j = 0; i <= hLen; i++) {
        if(j < nlen) {
            haystack[i] === needle[j] ? j++ : (j = 0)
        }else {
            return i - nlen
        }
    }
    return -1
};

console.log(strStr("mississippi", "issip"))
console.log("d是的")
