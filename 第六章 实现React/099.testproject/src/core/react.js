import { wrapToVdom } from './utils';

/**
 * 创建一个虚拟DOM，也就是一个React元素
 * babel默认会调用react.createElement
 * @param {*} type  元素名, span div p
 * @param {*} config 元素属性, className style
 * @param {*} children  元素儿子, 对象/数组
 */
function createElement(type, config, children) {
    let ref; // 可以通过 ref引用此元素
    let key; // 可以唯一标识一个子元素
    if (config) {
        delete config.__source;
        delete config.__self;
        ref = config.ref;
        key = config.key;
        delete config.ref;  //props里没有ref属性的
        delete config.key;
    }
    let props = { ...config };//props里没有key的

    /**
     * 1. children可能是React元素对象、string、 number、null、undefined
     * 2. string、number包裹成对象, 方便之后虚拟dom
     */
    if (arguments.length > 3) {
        props.children = Array.prototype.slice.call(arguments, 2).map(wrapToVdom);
    } else {
        props.children = wrapToVdom(children);
    }

    /**
     * 返回React元素, 结构如下
     * {
     *     type: 'div',
     *     ref: xxx,
     *     key: xxx,
     *     props: {
     *         childen: xxx
     *     }
     * }
     */
    return { type, ref, key, props };
}

class Component {
    // 标识是react组件
    // 源码是通过Component.prototype.isReactComponent = true来标识
    static isReactComponent = true
    constructor(props) {
        this.props = props
    }
}

const React = {
    createElement,
    Component,
}

export default React;