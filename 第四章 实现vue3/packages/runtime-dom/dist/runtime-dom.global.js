var vueRuntimeDom = (function (exports) {
    'use strict';

    const nodeOps = {
        createElement(tagName) {
            return document.createElement(tagName);
        },
        remove(child) {
            const parent = child.parentNode;
            if (parent) {
                parent.removeChild(child);
            }
        },
        querySelector(selector) {
            return document.querySelector(selector);
        },
        insert(child, parent, anchor = null) {
            parent.insertBefore(child, anchor);
        },
        createText(text) {
            return document.createTextNode(text);
        },
        setElementText(el, text) {
            el.textContent = text; // innerHTML会有风险
        },
        setText(node, text) {
            node.nodeValue = text;
        }
    };

    function patchClass(el, newValue) {
        if (newValue === null) {
            newValue = '';
        }
        el.className = newValue;
    }

    function patchStyle(el, oldValue, newValue) {
        const style = el.style;
        if (newValue === null) {
            el.removeAttribute('style');
        }
        else {
            if (oldValue) {
                for (let k in oldValue) {
                    if (newValue[k] === null) {
                        style[k] = '';
                    }
                }
            }
            for (let k in newValue) {
                style[k] = newValue[k];
            }
        }
    }

    function patchEvent(el, key, newValue) {
        const invokers = el._vei || (el._vei = {}); // 缓存起来
        const exists = invokers[key];
        if (exists && newValue) {
            exists.value = newValue;
        }
        else {
            const eventName = key.slice(2).toLowerCase();
            if (newValue) {
                const fn = invokers[key] = createInvoker(newValue);
                el.addEventListener(eventName, fn);
            }
            else {
                el.removeEventListener(eventName, exists);
            }
        }
    }
    function createInvoker(fn) {
        const invoker = (e) => { invoker.value(e); };
        invoker.value = fn;
        return invoker;
    }

    function patchAttr(el, key, newValue) {
        if (newValue === null) {
            el.removeAttribute(key);
        }
        else {
            el.setAttribute(key, newValue);
        }
    }

    function patchProp(el, key, oldValue, newValue) {
        switch (key) {
            case 'class':
                patchClass(el, newValue);
                break;
            case 'style':
                patchStyle(el, oldValue, newValue);
                break;
            default:
                if (/^on[a-z]/.test(key)) {
                    patchEvent(el, key, newValue);
                }
                else {
                    patchAttr(el, key, newValue);
                }
        }
    }

    const isObject = (v) => typeof v === 'object' && v !== null;
    const isArray = Array.isArray;
    const isString = v => typeof v === 'string';
    const extend = Object.assign;

    function createVnode(type, props, children = null) {
        let shapeFlag = isString(type) ? 1 /* ELEMENT */ :
            isObject(type) ? 4 /* STATEFUL_COMPONENT */ :
                0;
        let vnode = {
            __v_isVnode: true,
            type,
            props,
            children,
            el: null,
            key: props && props.key,
            shapeFlag
        };
        normalizeChildren(vnode, children);
        return vnode;
    }
    function normalizeChildren(vnode, children) {
        if (children === null) ;
        else if (isArray(children)) {
            vnode.shapeFlag |= 16 /* ARRAY_CHILDREN */;
        }
        else {
            vnode.shapeFlag |= 8 /* TEXT_CHILDREN */;
        }
    }

    function createAppAPI(render) {
        return function createApp(rootComponent, props) {
            let app = {
                _component: rootComponent,
                _rootProps: props,
                _container: null,
                use() { },
                mixin() { },
                component() { },
                mount(container) {
                    let vnode = createVnode(rootComponent, props);
                    console.log(vnode);
                    render(container);
                    app._container = container;
                }
            };
            return app;
        };
    }

    function createRender(renderOption) {
        // Vnode -> realDOM
        // [而vue2的render是执行_render函数生成Vnode, _update才是Vnode -> realDOM]
        const render = (vnode, container) => {
        };
        return {
            createApp: createAppAPI(render)
        };
    }

    /**
     * runtime-dom: 主要是对dom的一些操作
     */
    let renderOptions = extend(nodeOps, { patchProp });
    console.log(renderOptions);
    function createApp(rootComponent, props = null) {
        // core返回createApp和mount, 然后进行dom平台的封装
        const app = createRender().createApp(rootComponent, props);
        let { mount } = app;
        app.mount = function (container) {
            container = nodeOps.querySelector(container);
            container.innerHTML = '';
            let proxy = mount(container);
            return proxy;
        };
        return app;
    }
    function h() { }

    exports.createApp = createApp;
    exports.h = h;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

})({});
//# sourceMappingURL=runtime-dom.global.js.map
