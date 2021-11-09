import {createAppAPI} from "./apiCreateApp";


export function createRender(renderOption) {    // renderOption是不同平台传的值不同, 现在是只有dom平台
    // Vnode -> realDOM
    // [而vue2的render是执行_render函数生成Vnode, _update才是Vnode -> realDOM]
    const render = (vnode, container) => {
        patch(null, vnode, container)
    }
    const patch = (vnode1, vnode2, container) => {
        // TODO: 渲染逻辑, diff算法
    }
    return {
        createApp: createAppAPI(render)
    }
}
