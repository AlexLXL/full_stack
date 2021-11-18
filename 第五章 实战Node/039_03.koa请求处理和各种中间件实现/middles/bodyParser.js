/**
 * 1.通过高阶函数返回中间件
 * 2.外部会先app.use该中间件, 获取以后需要的值
 * @returns {function(...[*]=)}
 */
let querystring = require('querystring'); // 解析url的参数
const uuid = require('uuid')
const path = require('path')
const fs = require('fs')
Buffer.prototype.split = function(sep){
    let arr = [];
    let len = Buffer.from(sep).length; // 分隔符可能是中文的， 取值的结果是字节的
    let offset = 0;
    while (-1 != (index = this.indexOf(sep,offset))) {
        arr.push(this.slice(offset,index));
        offset = index + len
    }
    arr.push(this.slice(offset))
    // 在二进制中查找 sep的位置
    return arr;
}

function bodyParser({dir} = {}) {
    return async (ctx, next) => {
        ctx.request.body = await new Promise((resolve, reject) => {
            let arr = []
            ctx.req.on('data', function (chunk) {
                arr.push(chunk)
            })
            ctx.req.on('end', function () {
                // 用户提交的格式: 1.json 2.表格格式 3.普通字符 3.文件格式
                let type = ctx.get('Content-Type');
                let body = Buffer.concat(arr);
                if (type === 'application/x-www-form-urlencoded') {
                    resolve(querystring.parse(body.toString()))
                } else if (type.startsWith('text/plain')) {
                    resolve(body.toString());
                } else if (type.startsWith('application/json')) {
                    resolve(JSON.parse(body.toString()));
                } else if(type.startsWith('multipart/form-data')) {
                    let boundary = '--' + type.split('=')[1];
                    // buffer 就是没有split
                    let lines = body.split(boundary).slice(1,-1);
                    let formData = {};
                    lines.forEach(line=>{
                        let [head,body] = line.split('\r\n\r\n'); // 规范中定义的 key 和 value之间有 这东西
                        head = head.toString();
                        let key = head.match(/name="(.+?)"/)[1]
                        if(head.includes('filename')){
                            // 文件需要放到服务器上
                            // 文件内容
                            let content = line.slice(head.length + 4, -2);
                            dir = dir || path.join(__dirname,'upload');
                            let filePath = uuid.v4();
                            let uploadUrl = path.join(dir,filePath);
                            // 图片的后缀可以自己识别
                            formData[key] = {
                                filename:uploadUrl,
                                size:content.length,
                            }
                            fs.writeFileSync(uploadUrl,content)
                        }else{
                            let value = body.toString();
                            formData[key] = value.slice(0,-2);
                        }
                    })
                    resolve(formData);
                }else{
                    resolve({})
                }
            })
        })
        await next()
    }
}

module.exports = bodyParser


/**
 * 表单格式(最后一个是txt文件)
 * 分隔符: ------WebKitFormBoundaryMU3EDlmYooWdbsIV
 ------WebKitFormBoundaryMU3EDlmYooWdbsIV
 Content-Disposition: form-data; name="username"

 11
 ------WebKitFormBoundaryMU3EDlmYooWdbsIV
 Content-Disposition: form-data; name="password"

 22
 ------WebKitFormBoundaryMU3EDlmYooWdbsIV
 Content-Disposition: form-data; name="avatar"; filename="备忘录.txt"
 Content-Type: text/plain

 我是谁我来自哪里
 ------WebKitFormBoundaryMU3EDlmYooWdbsIV--
 */