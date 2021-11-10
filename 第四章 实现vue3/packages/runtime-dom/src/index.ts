/**
 * runtime-dom: 主要是对dom的一些操作
 */
import {nodeOps} from './nodeOps'
import {patchProp} from './patchProp'
import {extend} from "@vue/shared";
import {createRender} from "@vue/runtime-core";

let renderOptions = extend(nodeOps, {patchProp})
export function createApp(rootComponent, props = null) {
    // core返回createApp和mount, 然后进行dom平台的封装
    const app = createRender(renderOptions).createApp(rootComponent, props)
    let {mount} = app
    app.mount = function (container) {
        container = nodeOps.querySelector(container)
        container.innerHTML = ''
        let proxy = mount(container)
        return proxy
    }
    return app
}

export * from "@vue/runtime-core"
export * from "@vue/reactivity"
