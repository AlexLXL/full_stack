import {REACT_TEXT} from './constants'

/**
 * 1.虚拟DOM变成真实DOM
 * 2.插入到容器内部
 * @param {*} vdom 虚拟DOM
 * @param {*} parentDOM 容器
 */
function render(vdom, parentDOM) {
    mount(vdom, parentDOM);
}

function mount(vdom, parentDOM) {
    let newDOM = createDOM(vdom)
    if (newDOM) {
        parentDOM.appendChild(newDOM);
    }
}

/**
 * 把虚拟DOM转成真实DOM
 */
export function createDOM(vdom) {
    if (!vdom) return null;
    let {type, props, ref} = vdom;  // 虚拟DOM
    let dom;                        // 真实DOM
    /**
     * 分类:
     * 1. 函数组件、类组件
     * 2. 文本组件
     * 3. div span p
     */
    if (typeof type === 'function') {
        if (type.isReactComponent) {
            dom = mountClassComponent(vdom)
        }else {
            dom = mountFunctionComponent(vdom)
        }
    }else if (typeof type === 'function') {
        dom = mountFunctionComponent(vdom)
    }else if (type === REACT_TEXT) {
        dom = document.createTextNode(props.content);
    } else {
        dom = document.createElement(type);
    }
    /**
     * 处理属性
     */
    if (props) {
        updateProps(dom, {}, props);
        if (props.children) {
            /**
             * children分类:
             * 1. react虚拟DOM
             * 2. 数组
             */
            let children = props.children;
            if (typeof children === 'object' && children.type) {
                render(children, dom);
            } else if (Array.isArray(children)) {
                reconcileChildren(props.children, dom);
            }
        }
    }
    vdom.dom = dom; // 让虚拟DOM的dom属性指向这个虚拟DOM对应的真实DOM
    return dom;
}

/**
 * 把新的属性更新到真实DOM上
 * @param {*} dom 真实DOM
 * @param {*} oldProps 旧的属性对象
 * @param {*} newProps 新的属性对象
 */
function updateProps(dom, oldProps = {}, newProps = {}) {
    for (let key in newProps) {
        /**
         * 分类:
         * 1. child
         * 2. style
         * 3. on开头的事件
         * 4. id class value等
         */
        if (key === 'children') {
            continue;
        } else if (key === 'style') {
            let styleObj = newProps[key];
            for (let attr in styleObj) {
                dom.style[attr] = styleObj[attr];
            }
        }else if (key.startsWith('on')) {
            dom[key.toLocaleLowerCase()] = newProps[key]
        } else {
            dom[key] = newProps[key];
        }
    }
    for (let key in oldProps) {
        if (!newProps.hasOwnProperty(key)) {
            dom[key] = null;
        }
    }
}

/**
 * 挂载类组件
 * @param vdom 虚拟DOM
 */
function mountClassComponent(vdom) {
    let { type: ClassComponent, props } = vdom;
    let classInstance = new ClassComponent(props);
    let oldRenderVdom = classInstance.render();
    // 后面组件更新用
    vdom.oldRenderVdom = oldRenderVdom;
    return createDOM(oldRenderVdom);
}

/**
 * 挂载函数组件
 * @param vdom 虚拟DOM
 */
function mountFunctionComponent(vdom) {
    let { type, props } = vdom;
    let oldRenderVdom = type(props);
    // 后面组件更新用
    vdom.oldRenderVdom = oldRenderVdom;
    return createDOM(oldRenderVdom);
}

/**
 * children为数组的时候循环挂载
 * @param childrenVdom
 * @param parentDOM
 */
function reconcileChildren(childrenVdom, parentDOM) {
    childrenVdom.forEach((childVdom,index) => {
        render(childVdom, parentDOM)
    });
}

const ReactDOM = {
    render,
}

export default ReactDOM;
