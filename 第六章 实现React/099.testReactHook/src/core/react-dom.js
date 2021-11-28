import {REACT_TEXT, REACT_FORWARD_REF, REACT_FRAGMENT, MOVE, PLACEMENT, DELETION,
    REACT_PROVIDER, REACT_CONTEXT, REACT_MEMO} from './constants'
import {addEvent} from "./event";

/**
 * Hook
 */
let hookState = []; // 这是一个全局变量，用来记录hook的值
let hookIndex = 0; // 存放当前hook的索引值
let scheduleUpdate;

/**
 * 1.虚拟DOM变成真实DOM
 * 2.插入到容器内部
 * @param {*} vdom 虚拟DOM
 * @param {*} parentDOM 容器
 */
function render(vdom, parentDOM) {
    mount(vdom, parentDOM);
    //在React里不管在哪里触发的更新，真正的调度都是从根节点开始的
    scheduleUpdate = () => {
        hookIndex = 0
        compareToVdom(parentDOM, vdom, vdom)
    }
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
     * 1. React.memo(函数组件)
     * 2. ThemeContext.Provider
     * 3. ThemeContext.Consumer
     * 4. React.Fragment
     * 5. React.forwardRef包装过的函数组件
     * 6. 函数组件、类组件
     * 7. 文本组件
     * 8. div span p
     */
    if (type && type.$$typeof === REACT_MEMO) {
        return mountMemo(vdom)
    }else if (type && type.$$typeof === REACT_PROVIDER) {
        return mountProvider(vdom)
    }else if (type && type.$$typeof === REACT_CONTEXT) {
        return mountContext(vdom);
    }else if (type === REACT_FRAGMENT) {
        dom = document.createDocumentFragment()
    }else if (type && type.$$typeof === REACT_FORWARD_REF) {
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
                children._mountIndex = 0
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
 * 挂载React.memo(函数组件)组件
 * @param vdom 虚拟DOM
 */
function mountMemo(vdom){
    // type = { $$typeof:REACT_MEMO, type, compare }
    // type.type是函数组件
    let { type, props } = vdom;
    let renderVdom = type.type(props);
    vdom.prevProps= props;          // 在vdom记录上一次的属性对象
    vdom.oldRenderVdom = renderVdom;// findDOM的时候用的
    return createDOM(renderVdom);
}

/**
 * 挂载ThemeContext.Provider组件
 * @param vdom 虚拟DOM
 */
function mountProvider(vdom ) {
    let {type, props, ref} = vdom;
    // 赋值
    let context = type._context;
    context._currentValue = props.value;
    // 拿子元素挂载
    let renderVdom = props.children;
    vdom.oldRenderVdom = renderVdom; // 这个操作就是让当前的虚拟DOM的oldRenderVdom指向要渲染的虚拟DOM
    return createDOM(renderVdom);
}

/**
 * 挂载ThemeContext.Consumer组件
 * @param vdom 虚拟DOM
 */
function mountContext(vdom) {
    let {type, props, ref} = vdom;
    let context = type._context;
    let currentValue = context._currentValue;
    let renderVdom = props.children(currentValue);
    vdom.oldRenderVdom = renderVdom; // 这个操作就是让当前的虚拟DOM的oldRenderVdom指向要渲染的虚拟DOM
    return createDOM(renderVdom);
}

/**
 * 挂载方法组件
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
    if (ClassComponent.contextType) {
        classInstance.context = ClassComponent.contextType._currentValue
    }
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
    childrenVdom.forEach((childVdom, index) => {
        childVdom._mountIndex = index
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

/**
 * 卸载组件
 * @param vdom
 */
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

/**
 * 复用老节点, 更新组件
 * @param oldVdom
 * @param newVdom
 */
function updateElement(oldVdom, newVdom) {
    /**
     * 分类:
     * 1. 纯文本:　字符串或数字
     *    1.1 内容不同, 更新内容
     * 2. 原生组件: div、span
     * 3. 类组件或函数组件
     * 4. React.Fragment
     * 5. REACT_PROVIDER ( ThemeContext.Provider )
     * 6. REACT_CONTEXT ( ThemeContext.Consumer )
     * 7. React.memo(函数组件)
     */
    if (oldVdom.type === REACT_TEXT) {
        let currentDOM = newVdom.dom = findDOM(oldVdom)
        if (oldVdom.props.content !== newVdom.props.content) {
            currentDOM.textContent = newVdom.props.content
        }
    }else if (typeof oldVdom.type === 'string') {
        let currentDOM = newVdom.dom = findDOM(oldVdom)
        updateProps(currentDOM, oldVdom.props, newVdom.props)
        // 递归对比
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children)
    }else if (typeof oldVdom.type === 'function') {
        if (oldVdom.type.isReactComponent) {
            updateClassComponent(oldVdom, newVdom)
        }else {
            updateFunctionComponent(oldVdom, newVdom)
        }
    }else if (oldVdom.type === REACT_FRAGMENT) {
        let currentDOM = newVdom.dom = findDOM(oldVdom)
        updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children)
    }else if (oldVdom.type.$$typeof === REACT_PROVIDER) {
        updateProvider(oldVdom, newVdom)
    }else if (oldVdom.type.$$typeof === REACT_CONTEXT) {
        updateContext(oldVdom, newVdom)
    }else if(oldVdom.type.$$typeof === REACT_MEMO) {
        updateMemo(oldVdom, newVdom)
    }
}

/**
 * 复用老节点, 更新组件(3) —— 实现完整的DOM-DIFF
 * @param parentDOM
 * @param oldChildrenVdom
 * @param newChildrenVdom
 */
function updateChildren(parentDOM, oldChildrenVdom, newChildrenVdom) {
    oldChildrenVdom = Array.isArray(oldChildrenVdom) ? oldChildrenVdom : oldChildrenVdom ? [oldChildrenVdom] : []
    newChildrenVdom = Array.isArray(newChildrenVdom) ? newChildrenVdom : newChildrenVdom ? [newChildrenVdom] : []

    /**
     * 1.存储旧节点到map
     */
    let lastPlacedIndex = 0;
    let keyedOldMap = {};
    oldChildrenVdom.forEach((oldVChild, index) => {
        let oldKey = oldVChild.key || index;
        keyedOldMap[oldKey] = oldVChild;
    });

    let patch = []; // 存储将要进行的操作
    /**
     * 2.循环新数组
     * 3.存着将要进行的操作(MOVE/PLACEMENT/DELETE)
     */
    newChildrenVdom.forEach((newVChild, index) => {
        newVChild._mountIndex = index;//设置虚拟DOM的挂载索引为index
        let newKey = newVChild.key || index;
        let oldVChild = keyedOldMap[newKey];
        if (oldVChild) {
            // TODO: 要再次判断标签类型，先省略....
            updateElement(oldVChild, newVChild);
            if (oldVChild._mountIndex < lastPlacedIndex) {
                patch.push({
                    type: MOVE,
                    oldVChild,
                    newVChild,
                    fromIndex: oldVChild._mountIndex,
                    toIndex: index
                });
            }
            delete keyedOldMap[newKey]; // 已经复用的删除
            lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild._mountIndex);
        } else {
            // 没有找到可复用老节点
            patch.push({
                type: PLACEMENT,
                newVChild,
                toIndex: index
            });
        }
    });

    /*Object.values(keyedOldMap).forEach(oldVChild => {
        patch.push({
            type: DELETION,
            oldVChild,
            fromIndex: oldVChild._mountIndex
        })
    });*/
    // 不记录删除操作, 直接删
    const moveChilds = patch.filter(action => action.type === MOVE).map(action => action.oldVChild);
    Object.values(keyedOldMap).concat(moveChilds).forEach(oldVChild => {
        let currentDOM = findDOM(oldVChild);
        currentDOM.parentNode.removeChild(currentDOM);
    });

    /**
     * 4.执行操作
     */
    patch.forEach(action => {
        let {type, oldVChild, newVChild, fromIndex, toIndex} = action;
        let childNodes = parentDOM.childNodes; //获取真实的子DOM元素的集合[A,C,E]
        if (type === PLACEMENT) {
            let newDOM = createDOM(newVChild); //根据虚拟DOM创建真实DOM
            let childDOMNode = childNodes[toIndex]; //找一下目标索引现在对应的真实DOM元素
            if (childDOMNode) { //如果此位置 上已经 有DOM元素的，插入到它前面是
                parentDOM.insertBefore(newDOM, childDOMNode);
            } else {
                parentDOM.appendChild(newDOM); //添加到最后就可以了
            }
        } else if (type === MOVE) {
            let oldDOM = findDOM(oldVChild); //找到老的真实DOM 还可以把内存中的B取到，插入到指定的位置 B
            let childDOMNode = childNodes[toIndex]; //找一下目标索引现在对应的真实DOM元素
            if (childDOMNode) { //如果此位置 上已经 有DOM元素的，插入到它前面是
                parentDOM.insertBefore(oldDOM, childDOMNode);
            } else {
                parentDOM.appendChild(oldDOM); //添加到最后就可以了
            }
        }
    });
    


    
    /*let maxChildrenLength = Math.max(oldChildrenVdom.length, newChildrenVdom.length)
    for (let i = 0; i < maxChildrenLength; i++) {
        let nextVdom = oldChildrenVdom.find((item, index) => {
            return (index > i) && item && findDOM(item)
        })
        compareToVdom(parentDOM, oldChildrenVdom[i], newChildrenVdom[i], findDOM(nextVdom))
    }*/
}

/**
 * 复用老节点, 更新组件(1)
 * @param oldVdom
 * @param newVdom
 */
function updateClassComponent(oldVdom, newVdom) {
    let classInstance = newVdom.classInstance = oldVdom.classInstance
    let oldRenderVdom = newVdom.oldRenderVdom = oldVdom.oldRenderVdom
    if (classInstance.componentWillReceiveProps) {
        classInstance.componentWillReceiveProps()
    }
    classInstance.updater.emitUpdate(newVdom.props)
}

/**
 * 复用老节点, 更新组件(2)
 * @param oldVdom
 * @param newVdom
 */
function updateFunctionComponent(oldVdom, newVdom) {
    let currentDOM = findDOM(oldVdom)
    let parentDOM = currentDOM.parentNode
    let {type, props} = newVdom
    let newRenderVdom = type(props)
    compareToVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom)
    newVdom.oldRenderVdom = newRenderVdom
}

/**
 * 复用老节点, 更新组件(4)
 * @param oldVdom
 * @param newVdom
 */
function updateProvider(oldVdom, newVdom) {
    let currentDOM = findDOM(oldVdom);// <div style={{margin:'10px'
    let parentDOM = currentDOM.parentNode;// div#root
    let {type, props} = newVdom;// type ={$$typeof:REACT_PROVIDER,_context:context }
    let context = type._context;
    context._currentValue = props.value;// 给context赋上新的_currentValue
    let renderVdom = props.children;
    compareToVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
    newVdom.oldRenderVdom = renderVdom;
}

/**
 * 复用老节点, 更新组件(5)
 * @param oldVdom
 * @param newVdom
 */
function updateContext(oldVdom, newVdom) {
    let currentDOM = findDOM(oldVdom); //<div style={{margin:'10px'
    let parentDOM = currentDOM.parentNode; //div#root
    let {type, props} = newVdom; //type ={$$typeof:REACT_PROVIDER,_context:context }
    let context = type._context;
    let renderVdom = props.children(context._currentValue);
    compareToVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
    newVdom.oldRenderVdom = renderVdom;
}

/**
 * 复用老节点, 更新组件(6)
 * @param oldVdom
 * @param newVdom
 */
function updateMemo(oldVdom, newVdom) {
    let {type, prevProps} = oldVdom;
    //比较结果是相等,就不需要重新渲染 render
    let renderVdom = oldVdom.oldRenderVdom;
    if (!type.compare(prevProps, newVdom.props)) {
        let currentDOM = findDOM(oldVdom);
        let parentDOM = currentDOM.parentNode;
        let {type, props} = newVdom;
        renderVdom = type.type(props);
        compareToVdom(parentDOM, oldVdom.oldRenderVdom, renderVdom);
    }
    newVdom.prevProps = newVdom.props;
    newVdom.oldRenderVdom = renderVdom;
}

const ReactDOM = {
    render,
    createPortal: render,
}

export default ReactDOM;


/**
 * Hook: useState
 */
export function useState(initialState) {
    /*hookState[hookIndex] = hookState[hookIndex] || initialState;//hookState[0]=10
    let currentIndex = hookIndex;

    function setState(newState) {
        hookState[currentIndex] = newState;//currentIndex指向hookIndex赋值的时候的那个值 0
        scheduleUpdate();//状态变化后，要执行调度更新任务
    }

    return [hookState[hookIndex++], setState];*/

    return useReducer(null,initialState);
}

/**
 * Hook: useMemo
 */
export function useMemo(factory, deps) {
    //先判断是不是初次渲染
    if (hookState[hookIndex]) {
        let [lastMemo, lastDeps] = hookState[hookIndex];
        let same = deps && deps.every((item, index) => item === lastDeps[index]);
        if (same) {
            hookIndex++;
            return lastMemo;
        } else {
            let newMemo = factory();
            hookState[hookIndex++] = [newMemo, deps];
            return newMemo;
        }
    } else {
        //说明是初次渲染
        let newMemo = factory();
        hookState[hookIndex++] = [newMemo, deps];
        return newMemo;
    }
}

/**
 * Hook: useCallback
 */
export function useCallback(callback, deps) {
    //先判断是不是初次渲染
    if (hookState[hookIndex]) {
        let [lastCallback, lastDeps] = hookState[hookIndex];
        let same = deps && deps.every((item, index) => item === lastDeps[index]);
        if (same) {
            hookIndex++;
            return lastCallback;
        } else {
            hookState[hookIndex++] = [callback, deps];
            return callback;
        }
    } else {
        //说明是初次渲染
        hookState[hookIndex++] = [callback, deps];
        return callback;
    }
}

/**
 * Hook: useReducer
 */
export function useReducer(reducer, initialState) {
    hookState[hookIndex] = hookState[hookIndex] || initialState;//hookState[0]=10
    let currentIndex = hookIndex;

    function dispatch(action) {
        action = typeof action === 'function' ? action(hookState[currentIndex]) : action;
        hookState[currentIndex] = reducer ? reducer(hookState[currentIndex], action) : action;
        scheduleUpdate();
    }

    return [hookState[hookIndex++], dispatch];
}

/**
 * Hook: useEffect
 */
export function useEffect(effect, deps) {
    //先判断是不是初次渲染
    if (hookState[hookIndex]) {
        let [lastDestroy, lastDeps] = hookState[hookIndex];
        let same = deps && deps.every((item, index) => item === lastDeps[index]);
        if (same) {
            hookIndex++;
        } else {
            //如果有任何一个值不一样，则执行上一个销毁函数
            lastDestroy && lastDestroy();
            //开启一个新的宏任务
            setTimeout(() => {
                let destroy = effect();
                hookState[hookIndex++] = [destroy, deps]
            });
        }
    } else {
        //如果是第一次执行执行到此
        setTimeout(() => {
            let destroy = effect();
            hookState[hookIndex++] = [destroy, deps]
        });
    }
}
