import babel from "rollup-plugin-babel";
import serve from "rollup-plugin-serve";
import { nodeResolve } from '@rollup/plugin-node-resolve';

export default {
    input: "./src/index.js",
    output: {
        file: "dist/umd/vue.js",
        format: "umd",
        name: "Vue",
        sourcemap: true
    },
    plugins: [
        babel({
            exclude: "node_modules/**"
        }),
        nodeResolve()
    ]
}