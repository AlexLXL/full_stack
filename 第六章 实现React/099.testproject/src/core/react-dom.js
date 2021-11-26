import {REACT_TEXT, REACT_FORWARD_REF} from './constants'
import {addEvent} from "./event";

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
        if (newDOM._componentDidMount) newDOM._componentDidMount()
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
     * 1. React.forwardRef包装过的函数组件
     * 2. 函数组件、类组件
     * 3. 文本组件
     * 4. div span p
     */
    if (type && type.$$typeof === REACT_FORWARD_REF) {
        dom = mountForwardRefComponent(vdom)
    }else if (typeof type === 'function') {
        if (type.isReactComponent) {
            dom = mountClassComponent(vdom)
        }else {
            dom = mountFunctionComponent(vdom)
        }
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
    if (ref && !ref.current) ref.current = dom
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
            // dom[key.toLocaleLowerCase()] = newProps[key]
            /**
             * 目的: 批量异步更新, 需要在事件回调前后添加一些代码来进行异步更新
             *
             * React17前会把事件绑定到document上
             * React17后把事件绑定到了应用根节点root上
             * 通过冒泡的方式触发事件
             */
            addEvent(dom, key.toLocaleLowerCase(), newProps[key])
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
function mountForwardRefComponent(vdom) {
    let {type, props, ref} = vdom
    let oldRenderVdom = type.render(props, ref)
    vdom.oldRenderVdom = oldRenderVdom;
    return createDOM(oldRenderVdom);
}

/**
 * 挂载类组件
 * @param vdom 虚拟DOM
 */
function mountClassComponent(vdom) {
    let { type: ClassComponent, props, ref } = vdom;
    let classInstance = new ClassComponent(props);
    if (ref) (ref.current = classInstance)
    if (classInstance.componentWillMount) {
        classInstance.componentWillMount()
    }
    let oldRenderVdom = classInstance.render();
    // 后面组件更新用
    classInstance.oldRenderVdom = vdom.oldRenderVdom = oldRenderVdom;
    let dom = createDOM(oldRenderVdom);
    if (classInstance.componentDidMount) {
        dom._componentDidMount = classInstance.componentDidMount.bind(classInstance)
    }
    vdom.classInstance = classInstance
    return dom
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

/**
 * 根据旧的vdom查找旧的真实dom
 */
export function findDOM(vdom) {
    if (!vdom) return null
    if (vdom.dom) {
        return vdom.dom
    }else {
        let renderVdom = vdom.classInstance ? vdom.classInstance.oldRenderVdom : vdom.oldRenderVdom;
        return findDOM(renderVdom);
    }
}

export function compareToVdom(parentDom, oldRenderVdom, newRenderVdom, nextRealdom) {
    /**
     * 分类:
     * 1. 新老虚拟节点都没有
     * 2. 老的有, 新没有 (react条件判断删掉, 等同vue的v-if删掉) 【如: this.state.count === 4 ? null : <ChildCounter count={this.state.count} />}】
     * 3. 老没有, 新的有 (同上)
     * 4. 老的有, 新的有
     */
    if (!oldRenderVdom && !newRenderVdom) {
        return null
    }else if (oldRenderVdom && !newRenderVdom) {
        unMountVnode(oldRenderVdom);
    }else if (!oldRenderVdom && newRenderVdom) {
        let newRealDOM = createDOM(newRenderVdom)
        if(nextRealdom) {
            parentDom.insertBefore(newRealDOM, nextRealdom)
        }else {
            parentDom.appendChild(newRealDOM)
        }
        if (newRealDOM._componentDidMount) newRealDOM._componentDidMount()
    }else if (oldRenderVdom && newRenderVdom && oldRenderVdom.type !== newRenderVdom.type) {
        unMountVnode(oldRenderVdom);
        let newRealDOM = createDOM(newRenderVdom)
        if(nextRealdom) {
            parentDom.insertBefore(newRealDOM, nextRealdom)
        }else {
            parentDom.appendChild(newRealDOM)
        }
        if (newRealDOM._componentDidMount) newRealDOM._componentDidMount()
    }else if (oldRenderVdom && newRenderVdom && oldRenderVdom.type === newRenderVdom.type) {
        // 复用老节点, 深度对比更新即可
        updateElement(oldRenderVdom, newRenderVdom)
    }
    /*let oldRealDOM = findDOM(oldRenderVdom)
    let newRealDOM = createDOM(newRenderVdom)
    parentDom.replaceChild(newRealDOM, oldRealDOM)*/
}

function unMountVnode(vdom) {
    let {props, ref} = vdom
    let currentDOM = findDOM(vdom)
    /**
     * 分类:
     * 1. 类组件
     * 2. 函数组件
     * 3. 原生组件div
     */
    if (vdom.classInstance && vdom.classInstance.componentWillUnmount) {
        vdom.classInstance.componentWillUnmount()
    }
    if (props && ref) ref.current = null
    // 取消监听函数
    Object.keys(props).forEach(propName => {
        if (propName.slice(0, 2) === 'on') {
            delete currentDOM._store
        }
    })
    if (props.children) {
        let children = Array.isArray(props.children) ? props.children : [props.children]
        children.forEach(children)
    }
    currentDOM && currentDOM.parentNode.removeChild(currentDOM)
}

function updateElement(oldVdom, newVdom) {
    /**
     * 分类:
     * 1. 纯文本:　字符串或数字
     *    1.1 内容不同, 更新内容
     * 2. 原生组件: div、span
     * 3. 类组件或函数组件
     */
    if (oldVdom.type === REACT_TEXT) {
        if (oldVdom.props.content !== newVdom.props.content) {
            let currentDOM = newVdom.dom = findDOM(oldVdom)
            currentDOM.textContent = newVdom.props.content
        }
    }else if (typeof oldVdom.type === 'string') {
        let currentDOM = newVdom.dom = findDOM(oldVdom)
        updateProps(currentDOM, oldVdom.props, newVdom.props)
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children) // 递归对比
    }else if (typeof oldVdom.type === 'function') {
        if (oldVdom.type.isReactComponent) {
            updateClassComponent(oldVdom, newVdom)
        }else {
            updateFunctionComponent(oldVdom, newVdom)
        }
    }
}

function updateChildren(parentDOM, oldChildrenVdom, newChildrenVdom) {
    oldChildrenVdom = Array.isArray(oldChildrenVdom) ? oldChildrenVdom : oldChildrenVdom ? [oldChildrenVdom] : []
    newChildrenVdom = Array.isArray(newChildrenVdom) ? newChildrenVdom : newChildrenVdom ? [newChildrenVdom] : []
    let maxChildrenLength = Math.max(oldChildrenVdom.length, newChildrenVdom.length)
    for (let i = 0; i < maxChildrenLength; i++) {
        let nextVdom = oldChildrenVdom.find((item, index) => {
            return (index > i) && item && findDOM(item)
        })
        compareToVdom(parentDOM, oldChildrenVdom[i], newChildrenVdom[i], findDOM(nextVdom))
    }
}

function updateClassComponent(oldVdom, newVdom) {
    let classInstance = newVdom.classInstance = oldVdom.classInstance
    let oldRenderVdom = newVdom.oldRenderVdom = oldVdom.oldRenderVdom
    if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps()
    }
    classInstance.updater.emitUpdate(newVdom.props)
}

function updateFunctionComponent(oldVdom, newVdom) {
    let currentDOM = findDOM(oldVdom)
    let parentDOM = currentDOM.parentNode
    let {type, props} = newVdom
    let newRenderVdom = type(props)
    compareToVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom)
    newVdom.oldRenderVdom = newRenderVdom
}

const ReactDOM = {
    render,
    findDOM
}

export default ReactDOM;
