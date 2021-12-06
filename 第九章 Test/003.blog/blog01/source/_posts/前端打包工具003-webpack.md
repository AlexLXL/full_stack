---
title: 前端打包工具003_webpack
date: 2021-12-06 18:57:41
categories:  
- [window, 前端, 打包, webpack]  
tags:  
- window
- 前端
- 打包
- webpack
---

## 一、简介

- 本文使用webpack: 5.64.4 (踩坑和完整配置放于文末)
- 本文主要用于记录webpack5优化策略, 需要适当webpack基础,具体可以参考[官网](https://webpack.docschina.org/)

### 二、webpack5优化

#### 1.不需要`webpack loader`处理的文件

举例: jquery、lodash, 内部没有require和import的模块可以不解析, 加快构建速度

```
module: {
    // 优化1
+   noParse: /jquery|lodash/,
    rules: []
}
```

#### 2.第三方库优化

方案1. 使用更小的库替换第三方库  
- 示例: day.js替代moment.js 
 
方案2. 减少第三方库的打包内容  
- 示例: moment的locale模块(国际化)没有必要全量打包
   
方案3. 组件库的按需打包
- 示例: antdesign/elementui/lodash
- 原理: 将 `import {last} from 'lodash'` 转为 `import last from 'lodash/last'`

```
// 方案2配置: moment全量打包700k, 发现是local国际化的文件很多,
// 因此可以忽略这个local文件(可以减少500k)

// 配置
+ new webpack.IgnorePlugin({
+   contextRegExp: /moment$/,
+   resourceRegExp: /^\.\/locale/
+ })

// 补丁, 手动引入中文
require('moment/local/zh-cn')
```

```
// 方案3配置: babel-loader + babel-plugin-import 来按需打包
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
+                ["import", {libraryName: 'lodash', libraryDirectory: ''}]
            ],
        },
    },
},
```

#### 3、4点用于对最后的结果进行分析, 看有没优化的可能

#### 3.费时分析(loader用了多久, plugin用了多久) + 日志输出 

webpack.config.js

```
+ const SpeedMeasureWebpackPlugin = require('speed-measure-webpack-plugin');
+ const smw = new SpeedMeasureWebpackPlugin();
+ module.exports = smw.wrap({
    // ...配置...
    entry: "./src/index.html",
    output: {
        path: ""
        filename: ""
    },
    module: {
        rules: []
    },
    plugins: []
+ });
```

package.json

```
"scripts": {
    "build": "webpack",
+    "build:state": "webpack --json > states.json"
}
```

运行 `npm run build:state` 输出文件 `states.json`

#### 4.生成打包后的文件报告(各个模块大小)

```
+ const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');
+ module.exports={
+   plugins: [
+     new BundleAnalyzerPlugin()
+   ]
+ }
```

#### 5.1.优化压缩js
```
+const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    +  mode: 'none',
      devtool: false,
      entry: './src/index.js',
    +  optimization: {
    +    minimize: true,
    +    minimizer: [
    +      new TerserPlugin(),
    +    ],
    +  },
}
```

#### 5.2.优化压缩html
```
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',
    +     minify: {  
    +        collapseWhitespace: true,
    +        removeComments: true
    +     }
     }),
]
```

#### 5.3.优化压缩css
```
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

plugins: [
+   new OptimizeCssAssetsWebpackPlugin(),
]
```

#### 5.4.去除未使用的css
```
// 在配此之前要配好mini-css-extract-plugin和css-loader
npm i  purgecss-webpack-plugin glob -D

plugins: [
+    new PurgecssPlugin({
+      paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
+    })
]
```

#### 6.node_module和业务代码分开打包
```
resolve: {
+    modules: [
+        path.resolve(__dirname, '../src'),
+        "node_modules"
+    ],
    alias: {}
}
```

#### 7.多进程打包大项目

不推荐小项目使用, 开进程/进程通信/关闭进程也是有时间开销的

```
module: {
    rules: [
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: [
+                {
+                    loader: 'thread-loader',
+                    options: {
+                        workers: 2
+                    }
+                }
            ]
        }
    ]
}
```

#### 8.CDN
```
// 为了减少打包后体积, 可使用CDN引入第三方依赖

// 搭配output.libraryTarget: 'umd'使用
externals: {
    'vue': 'Vue',
    'jquery': 'window.$'
},
```

#### 9.合理使用hash、chunkhash、contenthash

- hash: 是整个项目的, 只要有文件改变, 都会改变
- chunkhash: 对应chunk的hash
- contenthash: 内容的hash
- 从左往右计算的难度会越来越大, 所以对于几乎不变的可使用contenthash,
变化比较频繁的可以使用chunkhash/hash, 具体按实际项目分配

#### 10.tree-shaking相关知识点(webpack内置的优化)

```
tree-shaking是webpack默认开启的

`没导入, 没使用的模块/变量/方法`、`不可能到达的代码` 都会摇下来
```

```
webpack代码分割的三种方式:
- 多入口entry
- 动态导入(也叫懒加载) `import('./title.js').then()`
- splitChunks 智能抽取的公共代码
 (webpack4添加的自定义chunk拆分规则, 如改成被三个模块引入才独立一个chunk,文件大小变大, 请求数减少
    一些第三方包很小就没必要都独立出来)
    - 多entry共享的依赖或代码模块
    - 压缩前大小或者提及大于20kb
    - 当按需加载代码块的时候, 并发请求的最大数量将会低于或等于30
```

如果对项目相当熟悉, 且有一定把控能力, 可以自定义splitChunks规则来对`请求数`和`文件大小`之间做权衡,优化打包结果

```
扩展知识点:
- `<link rel="preload" href="util.js" as="script">`  
- `<link rel="prefetch" href="util.js" as="script">`  
- preload 告诉浏览器, 未来一定会用到这个资源, 提高优先级，尽快加载这个资源  
- prefetch 告诉浏览器, 未来可能会用到这个资源, 有空的时候加载  

// 对于需要提前加载脚本, 可以使用该方式提前
```

#### 11.使用babel-loader的缓存或cache-loader

开销比较大的loader才做缓存, 因为读缓存、写缓存、判断缓存都是需要性能开销

```
{
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        {
            loader: 'babel-loader',
            options: {
+                // 开启缓存, 如果loader本身不支持可以使用cache-loader
+                // 一般只有开销比较大的loader才使用缓存,
+                // 读缓存、写缓存、判断缓存都是需要性能开销
+                cacheDirectory: true,
                presets: ["@babel/preset-env", '@babel/preset-react'],
                plugins: [
                    ["@babel/plugin-proposal-decorators", {legacy: true}],
                    ["@babel/plugin-proposal-private-property-in-object", {"loose": true}],
                ],
            },
        }
    ],
},
```

// webpack5默认开启了缓存, 所以不用上面的也可以
// 下面配置是webpack5将缓存写入硬盘(不配也没任何关系)

```
// 将缓存写入硬盘配置如下: 
// 注意一点, 写了之后不要使用cnpm, 会出现卡死现象; 两者规则冲突
cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, 'node_modules/.cache/webpack')
}
```

#### 12. 模块联邦

- 微前端实现方式之一, 可以将一个大项目拆成多个独立的子项目, 子项目中可以共享一些模块给其他模块使用

- 具体可看博客内微前端文章


&nbsp;
&nbsp;
&nbsp;


## 完整配置

webpack.config.js

```
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
```

postcss.config.js

```
let postcssPresetEnv = require('postcss-preset-env');

module.exports = {
    plugins: [postcssPresetEnv({
        browsers: 'last 10 version'
    })]
}
```

&nbsp;
&nbsp;
&nbsp;
&nbsp;

## 踩坑

#### 问题1. webpack.config.js名字、位置、配置均正确, 但就是不执行

> 具体情况:  
> webpack不默认执行配置文件,  
> 使用webpack --config ebpack.config.js , 重新执行 `npm run build` 提示找不到文件

> 解决: 删除文件, 重新新建后正常  
> 排查:文件名前多了个空格(捂脸.jpg)

#### 问题2.webpack-dev-server的contentBase属性改成了static

> 具体情况:
> 添加一个额外的目录, 使用contentBase不生效, 使用static可以

> 排查: 中文文档还没更新, 英文文档更新了static的使用

#### 问题3.使用eslint-loader的时候报错
TypeError: Cannot read property 'getFormatter' of undefined

解决: eslint版本从8降为7.32.0

#### 问题4: filemanager-webpack-plugin的delete配置不生效

处理: 手动rm -rf ./dist/*.map

未找到原因及解决

#### 问题5: css里面使用url图片, 打包出来两张图片, 且项目打包后图片路劲有问题

原因: github提示file-loader不支持webpack5,需要改用下面的

- url-loader => asset/inline 
- file-loader => asset/resource

解决

#### 问题6: AMD模块化是什么?

![](https://www.lixuelang.com/test/webpack/模块化相关.jpg)

#### 问题7: speed-measure-webpack-plugin费时分析插件导致mini-css-extract-plugin提取css报错

"speed-measure-webpack-plugin": "^1.5.0",  

"mini-css-extract-plugin": "^2.4.5",  