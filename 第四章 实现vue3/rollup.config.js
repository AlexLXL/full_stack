import path from 'path'
import ts from 'rollup-plugin-typescript2'
import { nodeResolve } from '@rollup/plugin-node-resolve'

let floldersPath = path.resolve(__dirname, 'packages')
let floderName = process.env.TARGET
let flolderPath = path.resolve(floldersPath, floderName)
let flolderInnerPath = (name) => path.resolve(flolderPath, name)
let packagejson = require(`${flolderInnerPath('package.json')}`)

let buildOptions = packagejson.buildOptions
let outputDict = {
    cjs: {
        name: buildOptions.name,
        file: flolderInnerPath(`dist/${floderName}.cjs.js`),
        format: 'cjs',
        sourcemap: true
    },
    "esm-bundler": {
        name: buildOptions.name,
        file: flolderInnerPath(`dist/${floderName}.esm-bundler.js`),
        format: 'esm',
        sourcemap: true
    },
    global: {
        name: buildOptions.name,
        file: flolderInnerPath(`dist/${floderName}.global.js`),
        format: 'iife',
        sourcemap: true
    },
}

function createConfig(output) {
    return {
        input: flolderInnerPath('src/index.ts'),
        output,
        plugins: [
            ts({
                tsconfig:path.resolve(__dirname, 'tsconfig.json')
            }),
            nodeResolve()
        ]
    }
}

export default buildOptions.formats.map(f => createConfig(outputDict[f]))
