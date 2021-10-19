import babel from "rollup-plugin-babel";
// import serve from "rollup-plugin-serve";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: "./src/index.js",        // 打包入口
    output: {
        file: "dist/umd/vue.js",    // 打包出口
        format: "umd",              // 模块化类型（umd = commonjs + es6）
        name: "Vue",                // 打包后的全局变量的名字
        sourcemap: true             // 编译后es5位置映射es6位置
    },
    plugins: [
        babel({                         // babel编译ES5以上语法
            exclude: "node_modules/**"  // 不编译node_module，glob写法
        }),
        nodeResolve()
    ]
}