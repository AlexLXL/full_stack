/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function(s) {
    let min = Math.pow(-2, 31)
    let max = Math.pow(2, 31) - 1
    let matching = s.trim().match(/[-]?\d+/)
    let num = matching ? matching[0] : 0
    if(matching.index === 0 && num !== "") {
        if(num < min) {
            return min
        }else if(num > max) {
            return max
        }else {
            return +num
        }
    }else {
        return 0
    }
};

console.log(myAtoi("42"))
console.log(myAtoi("   -42"))
console.log(myAtoi("4193 with words"))
console.log(myAtoi("words and 987"))
console.log(myAtoi("-91283472332"))