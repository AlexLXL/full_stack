import {createAppAPI} from "./apiCreateApp";
import {ShapeFlags} from "@vue/shared";
import {createComponentInstance, setupComponent} from "./component";

export function createRender(renderOption) {    // renderOption是不同平台传的值不同, 现在是只有dom平台
    // Vnode -> realDOM
    // [而vue2的render是执行_render函数生成Vnode, _update才是Vnode -> realDOM]
    const render = (vnode, container) => {
        patch(null, vnode, container)
    }
    const patch = (vnode1, vnode2, container) => {
        // if (vnode1 !== null) {
        //     // TODO: diff
        // }else {
            let {shapeFlag} = vnode2
            if (shapeFlag & ShapeFlags.ELEMENT) {
                // TODO: 传入的为元素
            }else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode1, vnode2, container)
            }
        // }
    }
    return {
        createApp: createAppAPI(render)
    }
}

function processComponent(vnode1, vnode2, container) {
    if (vnode1 === null) {
        mountComponent(vnode2, container)
    }else {
        // TODO: 组件更新
    }
}

function mountComponent(vnode2, container) {
    let instance = createComponentInstance(vnode2)  // 创建组件实例对象
    setupComponent(instance)    // 将setup数据添加到组件实例对象
}
