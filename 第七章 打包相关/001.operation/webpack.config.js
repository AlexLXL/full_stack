const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FilemanagerPlugin = require('filemanager-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    // loader作用: 识别模块为主, plugin: 打包优化，资源管理，注入环境变量
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                // options: {fix: true},
                enforce: 'pre'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env", '@babel/preset-react'],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", {legacy: true}],
                            ["@babel/plugin-proposal-private-property-in-object", {"loose": true}],
                        ],
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", {legacy: true}],
                            ["@babel/plugin-proposal-private-property-in-object", {"loose": true}],
                        ],
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[hash:8].[ext]',
                            outputPath: '/image',
                            limit: 8192 // 8K以下转换成base64
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html'
        }),
        // new webpack.DefinePlugin({
        //     'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        // }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*']
        }),

        // 测试环境使用sourcemap
        // new webpack.SourceMapDevToolPlugin({
        //     append: `\n//# sourceMappingURL=http://127.0.0.1:8081/[url]`, // 插入到源文件末尾
        //     filename: `[file].map` // 示例: main.js 输出为 main.js.map
        // }),

        // 把文件拷贝到maps目录, 不放在项目里
        // new FilemanagerPlugin({
        //     events: {
        //         onEnd: {
        //             copy: [
        //                 {
        //                     source: './dist/*.map',
        //                     destination: path.resolve(__dirname, './maps')
        //                 }
        //             ],
        //             delete: ['./dist/*.map']
        //         }
        //     }
        // }),

        // 自动向模块内注入第三方模块, 减少引入
        // 也可以使用expose-loader
        // new webpack.ProvidePlugin({
        //     $: "jquery",
        //     jQuery: "jquery",
        //     "window.jQuery": "jquery"
        // }),

        // 拷贝文件
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/mock'),
                    to: path.resolve(__dirname, 'dist/mock'),
                }
            ]
        })
    ],
    devServer: {
        port: 8080,
        open: true,
        compress: true,
        static: path.resolve(__dirname, 'static')
    },

    // sourcemap
    devtool: false,

    /**
     * 打包的时候不一起打包
     * 原本引入方式是生产依赖, 模块使用都会import/require。 但为了缩小体积, 上线改成使用CDN的方式引入, 并不再一起打包
     */
    externals: {
        'vue': 'Vue',
        'jquery': 'window.$'
    },

    // npm run build打包的时候监控文件变化, 变化了就继续打 (开发插件/写源码的时候可以用)
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300, // 防抖
    //     poll: 1000, // 每秒1000次去问文件系统有没变化
    // }
};