import {initMixin} from "./init";
import {renderMixin} from "./render";
import {lifCycleMixin} from "./lifeCycle";
import {initGlobalAPI} from "./globalAPI";
import {compilerToFunction} from "./compiler";
import {patch, createElm} from "./vdom/patch";

function Vue(options) {
    this._init(options)
}

// 扩展原型
initMixin(Vue)
renderMixin(Vue)
lifCycleMixin(Vue)
initGlobalAPI(Vue)

// let vm = new Vue({
//     data() {
//         return { name: "lang" }
//     }
// })
// let render = compilerToFunction(`<div>
//     <li key="a">a</li>
//     <li key="b">b</li>
//     <li key="c">c</li>
//     <li key="d">d</li>
// </div>`);
// let oldVnode = render.call(vm);
// let el = createElm(oldVnode); // 真实节点
// document.body.appendChild(el);
//
// vm.name = 'lang02'
// let render2 = compilerToFunction(`<div>
//     <li key="f">f</li>
//     <li key="b">b</li>
//     <li key="a">a</li>
//     <li key="g">g</li>
// </div>`);
// let newVnode = render2.call(vm);
// setTimeout(() => {
//     patch(oldVnode, newVnode);
//
//     // let el2 = createEle(newVnode);
//     // document.body.removeChild(el1);
//     // document.body.appendChild(el2);
//     // 以上是还没做diff的
// },3000)

export default Vue

