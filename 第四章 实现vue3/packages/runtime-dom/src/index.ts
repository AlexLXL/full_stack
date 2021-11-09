/**
 * runtime-dom: 主要是对dom的一些操作
 */
import {nodeOps} from './nodeOps'
import {patchProp} from './patchProp'
import {extend} from "@vue/shared";

let renderOptions = extend(nodeOps, {patchProp})
console.log(renderOptions)

export function createApp(rootComponent, props = null) {
    let app = {
        mount() {}
    }

    return app
}
export function h() {}
