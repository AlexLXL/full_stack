// 用"html".match(new RegExp(ncname))匹配
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`; // 标签名，子模块aaa-bbb
/*[
    0: "aa-bb"
    groups: undefined
    index: 1
    input: "<aa-bb>2131</aa-bb>"
    length: 1
]*/
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 命名空间标签，aa:aa-xxx。很少用
/*[
    0: "aa-bb"
    1: "aa-bb"
    groups: undefined
    index: 1
    input: "<aa-bb>2131</aa-bb>>"
    length: 2
]*/
const startTagOpen = new RegExp(`^<${qnameCapture}`); // <标签名和标签名，0: <aa:aa-xxx或<aa-aa, 1: aa:aa-xxx或aa-aa
/*[
    0: "<aa-bb"
    1: "aa-bb"
    groups: undefined
    index: 0
    input: "<aa-bb>2131</aa-bb>"
    length: 2
]*/
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; // 属性
/*{
    0: "title = 123"    // 完整字符串
    1: "title"      // key
    2: "="          // 等号
    3: undefined    // 双引号
    4: undefined    // 单引号
    5: "123"        // 无引号
    groups: undefined
    index: 0
    input: "title = 123></aa-bb>"
    length: 6
}*/
const startTagClose = /^\s*(\/?)>/; // 标签结束, >或/>
/*{
    0: "/>"
    1: "/"
    groups: undefined
    index: 0
    input: "/>32323"
    length: 2
}*/
// const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // // 文本, {{message}}
/*{
    0: "{{message}}"
    length: 1
}*/
const endTagReg = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 标签结束 0: </aa-bb>, 1: aa-bb
/*{
    0: "</aa-bb>"
    1: "aa-bb"
    groups: undefined
    index: 0
    input: "</aa-bb>"
    length: 2
}*/

export function parserHTML(html) {
    while(html) {
        let idx = html.indexOf("<")
        // 开始标签/结束标签
        if (idx === 0) {
            let startTag = parseStartTag()
            if (startTag) {
                start(startTag)
                continue;
            }
            let endTag
            if (endTag = html.match(endTagReg)) {
                end(endTag[1])
                advance(endTag[0].length)
            }
        }
        // 内容
        if (idx > 0) {
            let content = html.substring(0, idx);
            text(content);
            advance(content.length);
        }
    }
    function advance(len) {
        html = html.substring(len)
    }
    function parseStartTag() {
        let match = html.match(startTagOpen)
        if (!match) { return false }
        advance(match[0].length)


        let result = {
            tagName: match[1],
            attrs: []
        }
        let end,
            attr;
        while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
            result.attrs.push({
                name: attr[1],
                value: attr[3] || attr[4] || attr[5]
            })
            advance(attr[0].length)
        }
        if (end) {
            advance(end[0].length)
        }
        return result
    }
    function start({tagName, attrs}) {
        console.log(`S: ${tagName}, ${JSON.stringify(attrs)}`)
    }
    function end(tagName) {
        console.log(`E: ${tagName}`)
    }
    function text(content) {
        console.log(`C: ${content}`)
    }
}

