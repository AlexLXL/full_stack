let path = require('path')
let fs = require('fs').promises
let ejs = require('ejs')

/*ejs.renderFile(path.resolve(__dirname, 'templateDirs.html'), {arr: [1, 2, 3, 4]}, {async: true}).then(data => {
    console.log(data)
})*/
/*
输出结果:

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>文件列表</title>
</head>
<body>
<!-- ejs语法, \<\% js语法写这 \%\> \<\%= 要保留在html的值写着 \%\> -->
<!-- 最后会编译成字符串 -->

        1

        2

        3

        4

</body>
</html>
 */


/**
 * 实现模板引擎ejs
 * 原理: new Function + with
 */
async function renderFile(filePath, data) {
    let templateStr = await fs.readFile(filePath, 'utf8')
    let template = "let str = ''\r\n"
    template += 'with(obj){\r\n'
    template += 'str+=`'
    templateStr = templateStr.replace(/<%=(.*?)%>/g, function () {
        return '${' + arguments[1] + '}'
    })
    template += templateStr.replace(/<%(.*?)%>/g, function () {
        return '`\r\n' + arguments[1] + '\r\nstr+=`'
    })
    template += '`\r\n' + 'return str' + '\r\n}'
    // console.log(template)
    let fn = new Function('obj', template)
    // console.log(fn.toString())
    return fn(data)
}
/*
template输出:

let str = ''
with(obj){
str+=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>文件列表</title>
</head>
<body>
<!-- ejs语法, \<\% js语法写这 \%\> \<\%= 要保留在html的值写着 \%\> -->
<!-- 最后会编译成字符串 -->
    `
arr.forEach(item => {
str+=`
        ${item}
    `
})
str+=`
</body>
</html>`
return str
}


fn输出:
function anonymous(obj
) {
let str = ''
with(obj){
str+=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>文件列表</title>
</head>
<body>
<!-- ejs语法, \<\% js语法写这 \%\> \<\%= 要保留在html的值写着 \%\> -->
<!-- 最后会编译成字符串 -->
    `
arr.forEach(item => {
str+=`
        ${item}
    `
})
str+=`
</body>
</html>`
return str
}
}

 */

async function renderFileStr(templateStr, data) {
    let template = "let str = ''\r\n"
    template += 'with(obj){\r\n'
    template += 'str+=`'
    templateStr = templateStr.replace(/<%=(.*?)%>/g, function () {
        return '${' + arguments[1] + '}'
    })
    template += templateStr.replace(/<%(.*?)%>/g, function () {
        return '`\r\n' + arguments[1] + '\r\nstr+=`'
    })
    template += '`\r\n' + 'return str' + '\r\n}'
    let fn = new Function('obj', template)
    return fn(data)
}

// Test
// renderFile(path.resolve(__dirname, 'templateDirs.html'), {
//     dirs: [{url: '11', dir: '1111'}, {url: '22', dir: '2222'}],
//     pathname: 'ccccc'
// })

exports.renderFile = renderFile
exports.renderFileStr = renderFileStr