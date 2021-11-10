import {createAppAPI} from "./apiCreateApp";
import {ShapeFlags} from "@vue/shared";
import {createComponentInstance, setupComponent} from "./component";
import {effect} from "@vue/reactivity";

export function createRender(renderOption) {    // renderOption是不同平台传的值不同, 现在是只有dom平台
    // Vnode -> realDOM
    // [和vue2一样都是render生成vnode, vnode进行patch然后生成realDOM]
    // [下面这个render应该理解为强刷页面的函数, 真实组件render应该是instance.render]
    const render = (vnode, container) => {
        patch(null, vnode, container)
    }
    const patch = (vnode1, vnode2, container) => {
        // if (vnode1 !== null) {
        //     // TODO: diff
        // }else {
            let {shapeFlag} = vnode2
            if (shapeFlag & ShapeFlags.ELEMENT) {
                processElement(vnode1, vnode2, container)
            }else if (shapeFlag & ShapeFlags.STATEFUL_COMPONENT) {
                processComponent(vnode1, vnode2, container)
            }
        // }
    }

    function processElement(vnode1, vnode2, container) {
        if (vnode1 === null) {
            mountElement(vnode2, container)
        }else {}
    }
    function processComponent(vnode1, vnode2, container) {
        if (vnode1 === null) {
            mountComponent(vnode2, container)
        }else {
            // TODO: 组件更新
        }
    }

    let { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, setText: hostSetText, setElementText: hostSetElementText,} = renderOption
    function mountElement(vnode2, container) {
        let {props, type, children, shapeFlag} = vnode2
        let el = vnode2.el = hostCreateElement(type)
        if (props) {
            for (let k in props) {
                hostPatchProp(el, k, null, props[k])
            }
        }
        if (shapeFlag & ShapeFlags.TEXT_CHILDREN) {
            hostSetElementText(el, children)
        }else if (shapeFlag & ShapeFlags.ARRAY_CHILDREN) {
            mountChildren(children, el)
        }
        hostInsert(el, container)
    }
    function mountChildren(children, el) {
        for (let i = 0; i < children.length; i++) {
            patch(null, children[i], el)
        }
    }
    function mountComponent(vnode2, container) {
        let instance = createComponentInstance(vnode2)  // 1.创建组件实例对象
        setupComponent(instance)    // 2.将setup数据添加到组件实例对象
        setupRenderEffect(instance, container) // 3.添加渲染effect
    }

    function setupRenderEffect(instance, container) {
        instance.update = effect(() => {
            if (!instance.isMounted) {
                // 初渲染, effect函数内执行render, render内的变量就会进行依赖收集
                let subTree = instance.subTree = instance.render.call(instance.proxy, instance.proxy)
                // console.log(`初次渲染虚拟节点:`, subTree)
                patch(null, subTree, container)
                instance.isMounted = true
            }else{
                // TODO: 数据更新, diff算法
                let prevSubTree = instance.subTree
                let nextSubTree = instance.render.call(instance.proxy, instance.proxy)
                // console.log(prevSubTree, nextSubTree)
                
                // TODO: 数据更新, diff算法
                // patch(prevSubTree, nextSubTree, container)
            }
        })
    }

    return {
        createApp: createAppAPI(render)
    }
}


