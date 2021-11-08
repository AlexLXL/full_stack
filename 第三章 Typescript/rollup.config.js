import path from 'path'
import ts from 'rollup-plugin-typescript2'
import serve from 'rollup-plugin-serve'
import livereload from "rollup-plugin-livereload"   // 热更新页面

export default {
    input: './src/index.ts',
    output: {
        file: path.resolve(__dirname, './dist/bundle.js'),
        format: 'iife', // 立即执行函数
        sourcemap: true
    },
    plugins: [
        ts({
            tsconfig: path.resolve(__dirname, './tsconfig.json')
        }),
        livereload(),
        serve({
            open: true,
            openPage: '/public/index.html',
            contentBase: '',
            port: 9008,
        })
    ]
}