let defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配文本, {{message}}
/*{
    0: "{{message}}"
    length: 1
}*/

export function generate(ast) {
    // 2.处理子组件
    let children = genChildren(ast);

    // 1.处理第一层div
    let code =
        `_c("${ast.tag}",
            ${
                ast.attrs.length ? genProps(ast.attrs) : "undefined"
            }
            ${
                children ? `,${children}` : ""
            }
        )`;
    return code
}

function genChildren(el) {
    let children = el.children;
    if (children) {
        // 要分类讨论，1.普通文本 2.{{文本}} 3.子标签span/div
        return children.map(item => gen(item)).join(",");
    }
    return false
}

function gen(el) {
    if (el.type == 1) {
        // 3.子标签span/div
        return generate(el);
    }else {
        // 1.只有普通文本
        let text = el.text;
        if (!defaultTagRE.test(text)) return `_v("${text}")`;
        defaultTagRE.lastIndex = 0; // ★ /g正则调用test()和exec()lastIndex都会往后

        //  2.普通文本 + {{文本}}
        let lastIndex = 0;
        let tokens = [];
        let match;
        while(match = defaultTagRE.exec(text)) {
            // ★ exec和正则的/g要注意，/g会让 defaultTagRE的lastIndex 往后一位
            // 如<p>aa {{bb}} cc {{dd}}</p>
            // 第一次是匹配到aa {{bb}}
            let index = match.index;
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)));
            }
            tokens.push(`_s(${match[1].trim()})`);  // 1 -- name
            lastIndex = index + match[0].length;    // 0 -- {{name}}
        }
        if (lastIndex < text.length) { // 匹配最后的普通文本bb， aa {{name}} bb
            tokens.push(JSON.stringify(text.slice(lastIndex)));
        }

        return `_v(${tokens.join(" + ")})`
    }
}



/**
 * 生成属性字符串
 * @param attrs
 * @returns {string} 返回 {id:"app",style:{"font-size":"18px","color":"#ccc"}}
 */
function genProps(attrs) {
    let str = "";

    for (let i = 0; i < attrs.length; i++) {
        let attr = attrs[i];
        if (attr.name === "style") {
            let styles = {}
            attr.value.replace(/([^;:]+):([^;:]+)/g, function (...args) {
                styles[args[1].trim()] = args[2].trim();
            })
            attr.value = styles;
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`
    }

    return `{${str.slice(0, -1)}}`;
}
/*
* replace方法返回的arcgument
* {
*   0: "color:123"
*   1: "color"
*   2: "123"
*   3: 0
*   4: "color:123;color:123"
*   length: 5
* }
*
* */


