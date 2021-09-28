// 尝试手写解析parse


function parse(str) {
    let o = {}
    let kvs = str.split("&")
    kvs.forEach((kv) => {
        let [k, v] = kv.split("=")
        if (!v) return
        let path = k.split(/[\[\]]/g).filter(x => x);
        deep_set(o, path, v);
    })
    return o
}

function deep_set(o, path, value) {
    // let o = o
    let i = 0;
    for (;i < path.length - 1; i++) {
        if (!o[path[i]]) {
            if (/^\d+$/.test(path[i + 1])) {
                o[path[i]] = []
            } else {
                o[path[i]] = {}
            }
        }
        o = o[path[i]]
    }
    o[path[i]] = decodeURIComponent(value)
}

console.log(parse("a=aaa&b=bbb"))                       // OUTPUT: { a: 'aaa', b: 'bbb' }
console.log(parse("a&b"))                               // OUTPUT: {}
console.log(parse("a[name]=fox&a[company]=zhonggong"))  // OUTPUT: { a: { name: 'fox', company: 'zhonggong' } }
console.log(parse("a[0]=123&a[1]=456"))                 // OUTPUT: { a: [ '123', '456' ] }
console.log(parse("color=Deep%20blue"))                 // OUTPUT: { color: 'Deep blue' }




