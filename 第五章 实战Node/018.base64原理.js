/**
 * Base64编码要求把3个8位字节(38=24)转化为4个6位的字节(46=24),
 * 之后在6位的前面补两个0,形成8位一个字节的形式。
 * 如果剩下的字符不足3个字节,则用0填充。
 *
 * 因此大小会大1/3
 *
 * base64只是一种编码规则, 还有base32也是可以实现的
 */

// utf8中一个中文三字节
let r = Buffer.from("浪")
console.log(r)  // <Buffer e6 b5 aa>

console.log((0xe6).toString(2)) // 11100110
console.log((0xb5).toString(2)) // 10110101
console.log((0xaa).toString(2)) // 10101010

// 11100110  10110101  10101010
// 转四字节: 00111001  00101011  00010110 00101010

console.log(parseInt('00111001', 2))    // 57
console.log(parseInt('00101011', 2))    // 43
console.log(parseInt('00010110', 2))    // 22
console.log(parseInt('00101010', 2))    // 42

// 57 43 22 42  这就是base64转成的数字, 里面的值永远不会大于64, 因为最大是00111111

// 对照表
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str += str.toLowerCase()
str += '0123456789+/'

console.log(str[57] + str[43] + str[22] + str[42])  // 这就是base64输出的值: 5rWq

// 图片流转base64
// var base64str = `data:${mime.getType(filepath)};base64,${图片buffer.toString('base64')}`


