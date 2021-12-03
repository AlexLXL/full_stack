const webpack = require('webpack');
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const FilemanagerPlugin = require('filemanager-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
const smw = new SpeedMeasureWebpackPlugin();
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
const TerserPlugin = require('terser-webpack-plugin');

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

module.exports = smw.wrap({
    mode: 'none',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[chunkhash:8].js',
        chunkFilename: 'chunk/[name].bundle.js', // 修改chunk文件目录
        // libraryTarget: 'umd'
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
                test: /\.(png|jpg|jpeg|gif)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'image/[hash][ext][query]' // 生成到image文件夹
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
            filename: 'css/[name].[hash:8].css'
        }),

        // 打包花费时间(loader/plugin)
        // new webpack.IgnorePlugin({
        //     contextRegExp: /moment$/,
        //     resourceRegExp: /^\.\/locale/
        // }),

        // 打包后生成文件依赖和大小报告
        // new BundleAnalyzerPlugin()
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

    // 优化: 优化和压缩js
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin(),
        ],
    },
})