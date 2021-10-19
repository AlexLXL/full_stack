export function patch(oldVnode, vnode) {
    const parentNode = oldVnode.parentNode;
    const elm = createElm(vnode);
    parentNode.insertBefore(elm, oldVnode.nextSibing);
    parentNode.removeChild(oldVnode);
    return elm;
}

function createElm(vnode) {
    let {tag, data, children, text, vm} = vnode;

    if(typeof tag === "string"){
        vnode.el = document.createElement(tag);
        updateProperties(vnode.el, data);
        children.forEach(child => {
            vnode.el.appendChild(createElm(child));
        })
    }else {
        vnode.el = document.createTextNode(text);
    }

    return vnode.el;
}

function updateProperties(el, props={}) {
    // 边界问题: 样式
    for(let key in props) {
        el.setAttribute(key, props[key]);
    }
}