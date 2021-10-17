/**
 * 场景一: axios
 * axios发请求的写法是固定的,通过适配器模式来适配以下两种情况
 * 1.在浏览器使用XMLHttpRequest发请求
 * 2.在Node使用标准库http发请求
 */

export {}
axis({
    url: "http://localhost:9000/login?id=2",
    method: "GET"
}).then(
    (res: any) => {
        console.log(res)
    },
    (err: any) => {
        console.log(err)
    }
)

function axis(config: any): any {
    let adapter = getDefaultAdapter(config)
    return adapter(config)
}

function getDefaultAdapter(config: any): any {
    let adaptor: any;
    if (typeof XMLHttpRequest !== "undefined") {
        adaptor = xhr
    }else if (typeof process !== "undefined") {
        adaptor = http
    }
    return adaptor
}

// 浏览器
function xhr(config: any) {
    return new Promise((resolve, reject) => {
        let request = new XMLHttpRequest();
        request.open(config.method, config.url);
        request.addEventListener("readystatechange", (result) => {
            if(request.readyState === 4) {
                if (request.status === 200){
                    resolve(request.response)
                }else {
                    reject("请求失败")
                }
            }
        });
        // request.responseType = 'blob';
        // request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        // request.onload = function() {}  // 请求完成后
        request.send();
    })
}
// Node
function http(config: any) {
    let http = require("http")
    let urlObject = new URL(config.url)
    return new Promise((resolve, reject) => {
        let options = {
            hostname: urlObject.hostname,
            port: urlObject.port,
            path: `${urlObject.pathname}${urlObject.search}`,
            method: config.method,
        }
        let request = http.request(options, (response: any) => {
            let chunk: any = []
            response.on("data", (data: any) => {
                chunk.push(data)
            })
            response.on("end", () => {
                let result = Buffer.concat(chunk).toString()
                resolve(result)
            })
        })
        request.on("request", () => {
            reject("请求失败")
        })
        request.end()
    })
}