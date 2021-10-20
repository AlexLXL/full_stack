let defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g; // 匹配文本, {{message}}
/*{
    0: "{{message}}"
    length: 1
}*/

export function astGenerateCode(ast) {
    let children = genChildren(ast)
    let code = 
        `
        _c("${ast.tag}",
            ${
                ast.attrs.length ? genProps(ast.attrs) : undefined
            },
            ${
                children ? `${children}` : ""
            }
        )`
    return code
}
function genProps(attr) {
    let result = ""
    attr.forEach(item => {
        if (item.name === 'style') {
            let styles = {}
            item.value.replace(/([^;:]+):([^;:]+)/g, (...args) => {
                styles[args[1]] = args[2].trim()
            })
            item.value = styles
        }
        result += `${item.name}:${JSON.stringify(item.value)},`
    })
    return `{${result.slice(0,-1)}}`
}
function genChildren(ast) {
    let children = ast.children
    if (children) {
        return children.map(gen).join(",")
    }
    return false
}
function gen(subAst) {
    if (subAst.type === 1) {
        return astGenerateCode(subAst)
    }else {
        let text = subAst.text
        if (!defaultTagRE.test(text)) return `_v(${text})`
        defaultTagRE.lastIndex = 0

        let result = []
        let low = 0
        let match;
        while(match = defaultTagRE.exec(text)) {
            let fast = match.index
            if (fast > low) {
                result.push(JSON.stringify(text.slice(low, fast)))
            }
            result.push(`_s(${match[1].trim()})`)
            low = fast + match[0].length
        }
        if (low < text.length) {
            result.push(JSON.stringify(text.slice(low)))
        }
        return result
    }
}