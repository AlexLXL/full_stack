/*import('./css/index.css')
import('./css/less.less')
import('./css/sass.scss')*/

/*import centOs from './images/1.jpg'
let img = new Image()
img.src = centOs
document.body.appendChild(img)*/

/* var a = 2
console.log(a) */

// console.log('process.env.NODE_ENV', process.env.NODE_ENV);

/* function readonly(target, key, descriptor) {
    descriptor.writable = false;
}

class Person {
    @readonly
    PI = 3.14;
}

let p1 = new Person();
p1.PI = 3.15;
console.log(p1.PI) */

/*const a = 'cccccc';
const b = 4;
let c = () => {console.log(998)}
console.log(a + b);*/

// fetch('/api/home').then(res => {
//     return res.json()
// }).then(res => {
//     console.log(res)
// })

/*
import React,{Component} from 'react';
import ReactDOM from 'react-dom'
import rootStyle from './css/reactRoot.css'
ReactDOM.render(<div className={rootStyle.root}>react渲染内容</div>, document.getElementById("root"))
*/


/*
import {last, flatten} from 'lodash' // 打包出来523kb, 添加webpack配置后, 17.9kb
console.log(last, flatten)*/

import moment from 'moment'
require('moment/locale/zh-cn')
console.log(moment("20111031", "YYYYMMDD").fromNow())

