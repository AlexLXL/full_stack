let fs = require('fs')
let execa = require('execa')
let targets = fs.readdirSync('packages').filter(item => { // 拿目录
    return fs.statSync(`packages/${item}`).isDirectory()
})

async function build(target) {  // 开进程进行打包
    process.env.TARGET = target
    return execa('rollup', ['-c'], {stdio: 'inherit'})
    // execa('终端执行的命令', 参数数组)
}

function runAll(targets) {
    let result = []
    for(let target of targets) {
        result.push(build(target))
    }
    return Promise.all(result)
}

runAll(targets).then(() => {
    console.log("全部打包完成")
})