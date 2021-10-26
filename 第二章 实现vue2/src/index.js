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

let vm = new Vue({
    data() {
        return { name: "lang" }
    }
})
let render = compilerToFunction(`<div style="color: yellowgreen;font-size: 20px">{{name}}</div>`);
let oldVnode = render.call(vm);
let el = createElm(oldVnode); // 真实节点
document.body.appendChild(el);

vm.name = 'lang02'
let render2 = compilerToFunction(`<div style="color: lightskyblue">{{name}}</div>`);
let newVnode = render2.call(vm);
setTimeout(() => {
    patch(oldVnode, newVnode);

    // let el2 = createEle(newVnode);
    // document.body.removeChild(el1);
    // document.body.appendChild(el2);
    // 以上是还没做diff的
},2000)

export default Vue

