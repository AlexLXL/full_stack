/*
window.location.search.substr(1)

解析url参数:
    注意点:
    1.空值情况、
    2.url中的对象、数组
    3.中文空格会被编码成转义

    "a=1&c=hello"   =>  {a:1, b:"hello"}
    "a&b&c"         =>  {}
    "a[name]=fox&a[company]=tecent"     =>  {a: {"name": "fox", "copany": "tencent"}}
    "a[0]=1&a[1]=2"                     =>  {a: [1,2]}
    "color=Deep%20Blue"                 =>  {color: "Deep Blue"}
 */


function parse(str) {
    return str.split("&").reduce((o, kv) => {
        let [key, value] = kv.split("=")
        if (!value) {
            return o
        }
        // console.log(key.split(/[\[\]]/g).filter(x => x))
        deep_set(o, key.split(/[\[\]]/g).filter(x => x),value)
        return o
    }, {})
}

/**
 * 模拟一次运行(o, path = ['a', "name"], value = "fox")
 * 循环一次
 *      o["a"]是否存在
 *          path的后一位("name")是否是数字
 *              是的话 o["a"] = 数组
 *              否的话 o["a"] = 对象
 *      o 等于 刚刚生成或上一次生成的对象/数组(先取个名叫o1)（这里是为了下面对o1内部赋值）
 *  循环结束
 *  o1[拿到path的最后一个值] = value （o1赋值）
 *  一次设置结束
 */
function deep_set(o, path, value) {
    // let o = o
    let i = 0
    for (;i < path.length -1 ; i++) {
        if (o[path[i]] === undefined) {
            if (/^\d+$/.test(path[i + 1])) {
                o[path[i]] = []
            }else {
                o[path[i]] = {}
            }
        }
        o = o[path[i]]
        // 这行代码的理解，当前函数初始化时应该有一个 let o = o 的变量声明
    }
    o[path[i]] = decodeURIComponent(value)
}

// parse("a=1&c=hello")
// parse("a[name]=fox&a[company]=tecent")
// parse("a[0]=1&a[1]=2")

console.log(parse("a=1&c=hello"))                       // OUTPUT: { a: '1', c: 'hello' }
console.log(parse("a&b&c"))                             // OUTPUT: {}
console.log(parse("a[name]=fox&a[company]=tecent"))     // OUTPUT: { a: { name: 'fox', company: 'tecent' } }
console.log(parse("a[0]=1&a[1]=2"))                     // OUTPUT: { a: [ '1', '2' ] }
console.log(parse("color=Deep%20Blue"))                 // OUTPUT: { color: 'Deep Blue' }