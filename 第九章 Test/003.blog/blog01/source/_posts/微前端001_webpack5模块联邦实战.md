---
title: 微前端001_webpack5模块联邦实战
date: 2021-12-06 09:52:21
categories:  
- [window, 前端, 微前端, webpack]  
tags:  
- window
- 前端
- 微前端
- webpack
---

### 一、前置知识

1. 创建子项目`remote`: 暴露模块

2. 创建子项目`host`: 引用remote暴露模块

3. 暴露的模块我们先称为`容器`, 而引用容器的可以叫做`应用`

4. 配置参数

| 字段 | 类型 | 含义 |
| :--- | :--- | :--- |
name	   | string	| 必传值，即输出的模块名，被远程引用时路径为${name}/${expose}
library	   | object	| 声明全局变量的方式，name为umd的name
filename   | string	| 构建输出的文件名
remotes	   | object	| 远程引用的应用名及其别名的映射，使用时以key值作为name
exposes	   | object	| 被远程引用时可暴露的资源路径及其别名
shared	   | object	| 与其他应用之间可以共享的第三方依赖，使你的代码中不用重复加载同一份依赖

### 二、模块联邦

- 微前端实现方式之一, 可以将一个大项目拆成多个独立的子项目, 子项目中可以共享一些模块给其他模块使用

### 一) 实战

#### 创建子项目`remote`

1.创建文件夹`remote`

2.文件夹下执行 `npm run init`

3.package.json

```
{
  "name": "remote",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack server",
    "build": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.16.0",
    "@babel/preset-react": "^7.16.0",
    "babel-loader": "^8.2.3",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.64.4",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.6.0"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}

```

4.安装依赖`npm install`

5.remote\webpack.config.js

```
let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:3000/",
    },
    devServer: {
        port: 3000
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"]
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        // 使用模块联邦
        new ModuleFederationPlugin({
            // 模块名(用于应用webpack引用时使用)
            name: "appOne",
            // 打包后的文件名(用于应用webpack引用时使用)
            filename: "remoteEntry.js",
            // 共享的模块
            exposes: {
                "./NewsList": "./src/NewsList",
            },
            // 如果两个子项目都用了react、react-dom可以共用一个
            shared: {
                react: {singleton: true},
                "react-dom": {singleton: true}
            }
        })
    ]
}
```

6.remote\src\index.js

```
import("./bootstrap");
```

7.remote\src\bootstrap.js

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App/>, document.getElementById("root"));
```

8.remote\src\App.js

```
import React from "react";
import NewsList from './NewsList';

const App = () => (
    <div>
        <h2>本地组件NewsList</h2>
        <NewsList/>
    </div>
);

export default App;
```

9.remote\src\NewsList.js

```
import React from "react";

export default () => (
    <div>新闻列表1</div>
)
```

#### 创建子项目`host`

1.创建文件夹`host`

2.文件夹下执行 `npm run init`

3.package.json

```
{
  "name": "host",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack server",
    "webpack": "webpack"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.16.0",
    "@babel/preset-react": "^7.16.0",
    "babel-loader": "^8.2.3",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.64.4",
    "webpack-cli": "^4.9.1",
    "webpack-dev-server": "^4.6.0"
  },
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

4.安装依赖`npm install`

5.remote\webpack.config.js

```
let path = require("path");
let webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        publicPath: "http://localhost:8000/",
    },
    devServer: {
        port: 8000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-react"]
                    },
                },
                exclude: /node_modules/,
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html'
        }),
        new ModuleFederationPlugin({
            name: "appTwo",
            // filename: "remoteEntry.js",
            remotes: {
                remote_appOne_remoteEntry: "appOne@http://localhost:3000/remoteEntry.js"
            },
            shared: {
                react: {singleton: true},
                "react-dom": {singleton: true}
            }
        })
    ]
}
```

6.remote\src\index.js

```
import("./bootstrap");
```

7.remote\src\bootstrap.js

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App/>, document.getElementById("root"));
```

8.remote\src\App.js

```
import React from "react";
import Slides from './Slides';
// 使用remote子项目共享的模块
const RemoteNewsList = React.lazy(() => import("remote_appOne_remoteEntry/NewsList"));

const App = () => (
    <div>
        <h2 >本地组件Slides, 远程组件NewsList</h2>
        <Slides />
        <React.Suspense fallback="Loading NewsList">
            <RemoteNewsList />
        </React.Suspense>
    </div>
);
export default App;
```

9.remote\src\Slides.js

```
import React from "react";

export default () => (
    <div>轮播图</div>
)
```

#### 启动项目

子项目remote: `npm run dev`  

子项目host: `npm run dev`  

即可在host页面中看到remote的共享模块
