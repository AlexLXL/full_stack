/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
    let len = s.length
    for(let i = 0; i < len / 2; i++) {
        let tail = len - 1 - i
        s[i] = s[i].charCodeAt()
        s[tail] = s[tail].charCodeAt()
        s[i] ^= s[tail]
        s[tail] ^= s[i]
        s[i] ^= s[tail]
        s[i] = String.fromCharCode(s[i])
        s[tail] = String.fromCharCode(s[tail])
    }
};


reverseString(["h","e","l","l","o"])