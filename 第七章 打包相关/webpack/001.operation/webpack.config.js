const webpack = require('webpack');
const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FilemanagerPlugin = require('filemanager-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
// const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
// const smw = new SpeedMeasureWebpackPlugin();
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const htmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const glob = require("glob");
const PurgecssPlugin = require("purgecss-webpack-plugin");

console.log('process.env.NODE_ENV', process.env.NODE_ENV);
const PATHS = {src: path.join(__dirname, 'src')}

module.exports = {
    mode: 'production',
    // 多入口的时候如果一个入口对应一个新的html
    // 需要配置多个htmlWebpackPlugin指定
    // 否则会在一个html里全部引入
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk/[chunkhash:8].chunk.js', // 修改chunk文件目录
        // libraryTarget: 'umd' // 将项目以commonjs + commonjs2 + amd的方式导出
    },
    // loader作用: 识别模块为主, plugin: 打包优化，资源管理，注入环境变量
    module: {
        // 优化: 内部没有require和import的模块可以不解析, 加快构构建
        noParse: /jquery|lodash/,
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
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                mode: "local",
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                            },
                        },
                    },
                    'postcss-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
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
                            ["import", {libraryName: 'lodash', libraryDirectory: ''}]
                        ],
                    },
                },
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    // {
                    //     loader: 'thread-loader',
                    //     options: {
                    //         workers: 2
                    //     }
                    // },
                    {
                        loader: 'babel-loader',
                        options: {
                            // 开启缓存, 如果loader本身不支持可以使用cache-loader
                            // 一般只有开销比较大的loader才使用缓存,
                            // 读缓存、写缓存、判断缓存都是需要性能开销
                            cacheDirectory: true,
                            presets: ["@babel/preset-env", '@babel/preset-react'],
                            plugins: [
                                ["@babel/plugin-proposal-decorators", {legacy: true}],
                                ["@babel/plugin-proposal-private-property-in-object", {"loose": true}],
                            ],
                        },
                    }
                ],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'image/[name].[hash:5][ext]' // 生成到image文件夹
                },
                /**
                 * asset/resource - 替代以前的file-loader
                 * asset/inline - 替代以前的url-loader
                 * asset/source - 替代以前的raw-loader - 给什么返回什么
                 * asset - 自动选择
                 */
                // webpack5已经弃用url-loader、file-loader
                // use: [
                //     {
                //         loader: 'url-loader',
                //         options: {
                //             name: '[hash:8].[ext]',
                //             outputPath: '/image',
                //             publicPath: '/image',
                //             limit: 8192 // 8K以下转换成base64
                //         }
                //     }
                // ]
            },
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: './src/index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
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
        }),

        // 提取css到css目录
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash:8].css',
            chunkFilename: 'css/[chunkhash:8].chunk.css',
        }),

        // 打包花费时间(loader/plugin)
        // new webpack.IgnorePlugin({
        //     contextRegExp: /moment$/,
        //     resourceRegExp: /^\.\/locale/
        // }),

        // 打包后生成文件依赖和大小报告
        // new BundleAnalyzerPlugin()

        // 优化: 优化压缩css
        new OptimizeCssAssetsWebpackPlugin(),

        // 优化: 去除未使用的 css
        new PurgecssPlugin({
            paths: glob.sync(`${PATHS.src}/**/*`, {nodir: true}),
        })
    ],

    // devServer就是一个express, 所以也可以自己返回东西
    // webpack-dev-server时帮你开一个express
    // 如果时有现成写好的express,用webpack-dev-middleware就好
    devServer: {
        port: 8080,
        open: true,
        compress: true,
        static: path.resolve(__dirname, 'static'), // 额外的静态文件目录(即通过8080端口也会查该文件夹)
        // proxy: {
        //     "/api": {
        //         target: "http://localhost:3000",
        //         // pathRewrite: {"^/api": ""}
        //     }
        onBeforeSetupMiddleware: function (devServer) {
            if (!devServer) {
                throw new Error('webpack-dev-server is not defined');
            }

            devServer.app.get('/api/home', function (req, res) {
                res.json({ custom: 'response' });
            });
        },
    },

    // sourcemap
    devtool: false,

    /**
     * 从外部引入这些变量
     * 但为了缩小体积, 上线使用CDN的方式引入, 并引入到项目中
     * 配置output.libraryTarget: 'umd'使用
     */
    externals: {
        'vue': 'Vue',
        'jquery': 'window.$',
        // lodash: {
        //     commonjs: 'lodash',
        //     commonjs2: 'lodash',
        //     amd: 'lodash',
        //     root: '_'
        // }
    },

    // npm run build打包的时候监控文件变化, 变化了就继续打 (开发插件/写源码的时候可以用)
    // watch: true,
    // watchOptions: {
    //     ignored: /node_modules/,
    //     aggregateTimeout: 300, // 防抖
    //     poll: 1000, // 每秒1000次去问文件系统有没变化
    // }

    // 别名, css/js引入文件、图片使用@都会传到这里给webpack解析
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css'], // 引入时不加后缀, webpack查找时匹配后缀
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },


    optimization: {
        /*
        // 优化: 优化和压缩js
        minimize: true,
        minimizer: [
            new TerserPlugin(),
        ],*/

        // 自定义chunk拆分规则
        splitChunk: {
            // 代码块分割的方式: async、initial、all (异步、同步、全部的意思)
            // async, 如: import('./a.js')
            // initial, 如: import _ from 'lodash'
            chunks: 'all',
            // 分割出去的代码块最小体积, 0代表不限制
            minSize: 0,
            // 表示一个模块至少被几个入口引用才会分割出代码块
            minChunks: 2,
            // 分割出去的代码块名称的连接符, 默认值时cacheGroup~代码块名称
            automaticNameDelimiter: '~',
            // 最大异步模块请求数(入口文件最多拆成几个代码块)
            maxAsyncRequests: 30,
            // 最大同步模块请求数(入口文件最多拆成几个代码块)
            // 超过值后就会把剩下的模块内嵌一起
            maxInitialRequests: 30,
            // 定义缓存组
            cacheGroups: {
                // 缓存组名称
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    // 如果lodash模块同时可以归入多个缓存组, 打包后引入时,会使用优先级比较高的
                    priority: -10,
                    // 如果当前块包含已经从主包中分离出来的模块，它将被重用，而不是生成一个新的。
                    // 如lodash以来module1模块, 带module1已经抽离出来, 重用就好, 没必要再打包进来
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
            /**
             * 示例:
             * page1.js 依赖 module1、module2、jquery、asyncModule1
             * page2.js 依赖 module1、module2、jquery
             * page3.js 依赖 module1、module2、jquery
             *
             * 按缓存组分割
             * default-src_module1_js.js    // 分到default组
             * default-src_module2_js.js    // 分到default组
             * asyncModule1.js              // 动态导入, 所以被单独分割
             * defaultVendors-node_modules_jquery_dist_jquery_js.js // 分到defaultVendors组
             */
        }

        // runtime
    },
}