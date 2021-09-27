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

function deep_set(o, path, value) {
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
    }
    o[path[i]] = decodeURIComponent(value)
}

// parse("a=1&c=hello")
// parse("a[name]=fox&a[company]=tecent")
// parse("a[0]=1&a[1]=2")

// console.log(parse("a=1&c=hello"))
// console.log(parse("a&b&c"))
console.log(parse("a[name]=fox&a[company]=tecent"))
// console.log(parse("a[0]=1&a[1]=2"))
// console.log(parse("color=Deep%20Blue"))