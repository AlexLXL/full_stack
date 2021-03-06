---
title: 前端打包工具002_rollup
date: 2021-12-06 18:51:46
categories:  
- [window, 前端, 打包, rollup]  
tags:  
- window
- 前端
- 打包
- rollup
---

## 1. rollup实战

- rollupjs是下一代ES模块捆绑器

### 1.1 安装依赖

```
npm i @babel/core @babel/preset-env  @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-typescript lodash rollup rollup-plugin-babel postcss rollup-plugin-postcss rollup-plugin-terser tslib typescript rollup-plugin-serve rollup-plugin-livereload -D
```

### 1.2 初次使用

#### 1.2.1 rollup.config.js

rollup.config.js

```
export default {
    input:'src/main.js',
    output:{
        file:'dist/bundle.cjs.js',//输出文件的路径和名称
        format:'cjs',//五种输出格式：amd/es6/iife/umd/cjs
        name:'bundleName'//当format为iife和umd时必须提供，将作为全局变量挂在window下
    }
}
```

#### 1.2.2 src\main.js

src\main.js

```
console.log('hello');
```

#### 1.2.3 package.json

package.json

```
{
 "scripts": {
    "build": "rollup --config"
  },
}
```

#### 1.2.4 dist\index.html

dist\index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>rollup</title>
</head>
<body>
    <script src="bundle.cjs.js"></script>
</body>
</html>
```

### 1.3 支持babel

#### 1.3.1 安装依赖

```
npm install rollup-plugin-babel @babel/core @babel/preset-env --save-dev
```

#### 1.3.2 src\main.js

```
let sum = (a,b)=>{
    return a+b;
}
let result = sum(1,2);
console.log(result);
```

#### 1.3.3 .babelrc

.babelrc

```
{
    "presets": [
       [
        "@babel/env",
        {
            "modules":false
        }
       ]
    ]
}
```

#### 1.3.4 rollup.config.js

rollup.config.js

```
+import babel from 'rollup-plugin-babel';
export default {
    input:'src/main.js',
    output:{
        file:'dist/bundle.cjs.js',//输出文件的路径和名称
        format:'cjs',//五种输出格式：amd/es6/iife/umd/cjs
        name:'bundleName'//当format为iife和umd时必须提供，将作为全局变量挂在window下
    },
+   plugins:[
+       babel({
+           exclude:"node_modules/**"
+       })
+   ]
}
```

### 1.4 tree-shaking

默认开启的, 测试一下即可

#### 1.4.1 src\main.js

```
import {name,age} from './msg';
console.log(name);
```

#### 1.4.2 src\msg.js

```
export var name = 'zhufeng';
export var age = 12;
```

### 1.5 使用第三方模块

- rollup.js编译源码中的模块引用默认只支持 ES6+的模块方式`import/export`
- 即使用 `import _ from 'lodash'` 不会打包lodash模块, 会报错 `Uncaught ReferenceError: require is not defined`

#### 1.5.1 安装依赖

```
npm install @rollup/plugin-node-resolve @rollup/plugin-commonjs lodash  -D
```

#### 1.5.2 src\main.js

```
import _ from 'lodash';
console.log(_);
```

#### 1.5.3 rollup.config.js

```
import babel from 'rollup-plugin-babel';
+import resolve from '@rollup/plugin-node-resolve';
+import commonjs from '@rollup/plugin-commonjs';
export default {
    input:'src/main.js',
    output:{
        file:'dist/bundle.cjs.js',//输出文件的路径和名称
        format:'cjs',//五种输出格式：amd/es6/iife/umd/cjs
        name:'bundleName'//当format为iife和umd时必须提供，将作为全局变量挂在window下
    },
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
+       resolve(),
+       commonjs()
    ]
}
```

### 1.6 使用CDN

#### 1.6.1 src\main.js

```
import _ from 'lodash';
import $ from 'jquery';
console.log(_.concat([1,2,3],4,5));
console.log($);
export default 'main';
```

#### 1.6.2 dist\index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>rollup</title>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/npm/lodash/lodash.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery/jquery.min.js"></script>
    <script src="bundle.cjs.js"></script>
</body>
</html>
```

#### 1.6.3 rollup.config.js

```
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
export default {
    input:'src/main.js',
    output:{
        file:'dist/bundle.cjs.js',//输出文件的路径和名称
+       format:'iife',//五种输出格式：amd/es6/iife/umd/cjs
+       name:'bundleName',//当format为iife和umd时必须提供，将作为全局变量挂在window下
+       globals:{
+           lodash:'_', //告诉rollup全局变量_即是lodash
+           jquery:'$' //告诉rollup全局变量$即是jquery
+       }
    },
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
        resolve(),
        commonjs()
    ],
+   external:['lodash','jquery']
}
```

## 1.7 使用typescript

#### 1.7.1 安装

```
npm install tslib typescript @rollup/plugin-typescript -D
```

#### 1.7.2 src\main.ts

```
let myName:string = 'zhufeng';
let age:number=12;
console.log(myName,age);
```

#### 1.7.3 rollup.config.js

```
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
+import typescript from '@rollup/plugin-typescript';
export default {
+   input:'src/main.ts',
    output:{
        file:'dist/bundle.cjs.js',//输出文件的路径和名称
        format:'iife',//五种输出格式：amd/es6/iife/umd/cjs
        name:'bundleName',//当format为iife和umd时必须提供，将作为全局变量挂在window下
        globals:{
            lodash:'_', //告诉rollup全局变量_即是lodash
            jquery:'$' //告诉rollup全局变量$即是jquery
        }
    },
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
        resolve(),
        commonjs(),
+       typescript()
    ],
    external:['lodash','jquery']
}
```

#### 1.7.4 tsconfig.json

```
{
  "compilerOptions": {  
    "target": "es5",                          
    "module": "ESNext",                     
    "strict": true,                         
    "skipLibCheck": true,                    
    "forceConsistentCasingInFileNames": true 
  }
}
```

## 1.8 压缩JS

#### 1.8.1 安装

```
npm install rollup-plugin-terser -D
```

#### 1.8.2 rollup.config.js

```
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
+import {terser} from 'rollup-plugin-terser';
export default {
    input:'src/main.ts',
    output:{
        file:'dist/bundle.cjs.js',//输出文件的路径和名称
        format:'iife',//五种输出格式：amd/es6/iife/umd/cjs
        name:'bundleName',//当format为iife和umd时必须提供，将作为全局变量挂在window下
        globals:{
            lodash:'_', //告诉rollup全局变量_即是lodash
            jquery:'$' //告诉rollup全局变量$即是jquery
        }
    },
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
        resolve(),
        commonjs(),
        typescript(),
+       terser(),
    ],
    external:['lodash','jquery']
}
```

## 1.9 编译css

#### 1.9.1 安装

```
npm install  postcss rollup-plugin-postcss -D
```

#### 1.9.2 rollup.config.js

```
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
+import postcss from 'rollup-plugin-postcss';
export default {
    input:'src/main.js',
    output:{
        file:'dist/bundle.cjs.js',//输出文件的路径和名称
        format:'iife',//五种输出格式：amd/es6/iife/umd/cjs
        name:'bundleName',//当format为iife和umd时必须提供，将作为全局变量挂在window下
        globals:{
            lodash:'_', //告诉rollup全局变量_即是lodash
            jquery:'$' //告诉rollup全局变量$即是jquery
        }
    },
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
        resolve(),
        commonjs(),
        typescript(),
        //terser(),
+       postcss()
    ],
    external:['lodash','jquery']
}
```

#### 1.9.3 src\main.js

```
body{
    background-color: green;
}
```

### 1.10 本地服务器

#### 1.10.1 安装

```
npm install rollup-plugin-serve -D
```

#### 1.10.2 rollup.config.dev.js

```
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
+import serve from 'rollup-plugin-serve';
export default {
    input:'src/main.js',
    output:{
        file:'dist/bundle.cjs.js',//输出文件的路径和名称
        format:'iife',//五种输出格式：amd/es6/iife/umd/cjs
        name:'bundleName',//当format为iife和umd时必须提供，将作为全局变量挂在window下
        sourcemap:true,
        globals:{
            lodash:'_', //告诉rollup全局变量_即是lodash
            jquery:'$' //告诉rollup全局变量$即是jquery
        }
    },
    plugins:[
        babel({
            exclude:"node_modules/**"
        }),
        resolve(),
        commonjs(),
        typescript(),
        postcss(),
+       serve({
+           open:true,
+           port:8080,
+           contentBase:'./dist'
+       })
    ],
    external:['lodash','jquery']
}
```