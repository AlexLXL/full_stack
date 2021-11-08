let fs = require('fs')
let execa = require('execa')

let target = 'reactivity'

function build(target) {
    process.env.TARGET = target
    return execa('rollup', ['-c', '-w'], {stdio: 'inherit'})
}

build(target).then(() => {
    console.log("打包完成")
})