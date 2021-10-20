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
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 标签结束 0: </aa-bb>, 1: aa-bb
/*{
    0: "</aa-bb>"
    1: "aa-bb"
    groups: undefined
    index: 0
    input: "</aa-bb>"
    length: 2
}*/

// 生成ast树
export function parserHTML(html) {
    let stack = [];
    let root = null;
    function start(tagName, attrs) {
        let parent = stack[stack.length - 1];
        let element = createASTElement(tagName, attrs, parent);
        if (root === null) {
            root = element;
        }

        if (parent) {
            element.parent = parent;
            parent.children.push(element);
        }

        stack.push(element);
    }
    function text(chars) {
        let parent = stack[stack.length - 1];
        chars.replace(/\s/g, ""); // 替换空格
        if(chars) {
            parent.children.push({
                type: 2,
                text:chars
            })
        }
    }
    function end(tagName) {
        let endTag = stack.pop();
        if(endTag.tag != tagName) {
            console.log("标签出错");
        }
    }
    function advance(len) {
        html = html.substring(len);
    }
    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            // 开始标签
            const match = {
                tagName: start[1],
                attrs: []
            }
            advance(start[0].length);

            // 匹配到结束标签为止，这部分都是属性
            let end,
                attr
            while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) { // 顺序不能反
                match.attrs.push({
                    name: attr[1],
                    value: attr[3] || attr[4] || attr[5]
                })
                advance(attr[0].length);
            }
            if (end) {
                advance(end[0].length)
            }

            return match;
            /*
            {
                tagName: div,
                attrs: [
                    {title: 123}
                ]
            }
            */
        }
        return false;
    }
    function createASTElement(tag, attrs, parent) {
        return {
            tag,
            attrs,
            parent,
            type: 1,
            children: []
        }
    }

    while(html) {
        let index = html.indexOf("<");
        if (index === 0) {
            // 开始标签
            const startTagMatch = parseStartTag(html); // 拿到开始标签的名称和属性，开始构建ast
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }
            // 结束标签
            let endTagMatch
            if(endTagMatch = html.match(endTag)) {
                end(endTagMatch[1]);
                advance(endTagMatch[0].length)
                continue;
            }
            break;
        }
        // 文本
        if (index > 0) {
            let chars = html.substring(0, index);
            text(chars);
            advance(chars.length);
        }
    }

    return root;
}