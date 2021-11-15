/**
 * 文件夹操作
 */

// 创建多层文件夹
let path = require('path')
let fs = require('fs')
/*fs.mkdir('a/b/c', {recursive: true}, (err, data) => {
    console.log(`创建目录成功`)
})*/

// 创建多层文件夹简单实现
/*function mkdir(dirPath, cb) {
    let dirs = dirPath.split('/')
    let index = 0
    function next() {
        if (index === dirs.length) return cb(null)
        let p = dirs.slice(0, ++index).join('/')
        fs.stat(p, (err) => {
            if (err) {
                fs.mkdir(p, next)
            }else {
                next()
            }
        })
    }
    next()
}
mkdir('a/b/c', () => {
    console.log(`创建成功`)
})*/


// 删除多层文件夹
/*fs.rmdir('a', {recursive: true}, (err) => {
    console.log(err)
})*/

// 删除多层文件夹简单实现(不可用-只能删两层)
/*fs.readdir('a', (err, dirs) => {
    dirs = dirs.map(item => path.join('a', item))
    let index = 0
    function next() {
        if (index === dirs.length) return fs.rmdir('a', () => {`删除成功`})
        let p = dirs[index++]
        fs.stat(p, (error, stat) => {
            if (stat.isDirectory()) {
                fs.rmdir(p, next)
            }else {
                fs.unlink(p, next)
            }
        })
    }
    next()
})*/

// 删除多层文件夹简单实现(可用)
/*function deleteFolder(delPath, direct) {
    delPath = direct ? path.join(__dirname, delPath) : delPath;
    try {
        if (fs.existsSync(delPath)) {
            const delFn = function (address) {
                const files = fs.readdirSync(address)
                for (let i = 0; i < files.length; i++) {
                    const dirPath = path.join(address, files[i])
                    if (fs.statSync(dirPath).isDirectory()) {
                        delFn(dirPath)
                    } else {
                        deleteFile(dirPath, direct)
                    }
                }
                /!**
                 * @des 只能删空文件夹
                 *!/
                fs.rmdirSync(address);
            }
            delFn(delPath);
        } else {
            console.log('do not exist: ', delPath);
        }
    } catch (error) {
        console.log('del folder error', error);
    }
}
deleteFolder('./a', true)*/
