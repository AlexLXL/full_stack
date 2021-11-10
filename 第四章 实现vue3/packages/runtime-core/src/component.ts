import {hasOwn, isFunction, isObject, ShapeFlags} from "@vue/shared";

/**
 * 创建组件实例
 * @param vnode
 */
export function createComponentInstance(vnode) {
    let instance = {
        vnode,
        data: {},
        attrs: {},  // 去掉用户使用的props后的结果
        props: {},
        slots: {},
        render: null,
        setupState: {},
        subTree: null,
        isMounted: false,
        bc: null,
        m: null,
        ctx: {},
        proxy: {}
    }

    instance.ctx = {_: instance}
    return instance
}

/**
 * 添加setup数据到实例
 * @param vnode
 */
export function setupComponent(instance) {
    let isStateful = isStatefulComponent(instance.vnode)
    isStateful ? setupStatefulComponent(instance) : undefined
}
function isStatefulComponent(vnode) {
    return vnode.shapeFlag & ShapeFlags.STATEFUL_COMPONENT
}
function setupStatefulComponent(instance) {
    instance.proxy = new Proxy(instance.ctx, {
        get({_: instance}, key) {
            let {setupState, data, props} = instance
            if (hasOwn(setupState, key)) {
                return setupState[key]
            }else if (hasOwn(data, key)) {
                return data[key]
            }else if (hasOwn(props, key)) {
                return props[key]
            }
        },
        set({_: instance}, key, value) {
            let {setupState, data, props} = instance
            if (hasOwn(setupState, key)) {
                setupState[key] = value
            }else if (hasOwn(data, key)) {
                data[key] = value
            }else if (hasOwn(props, key)) {
                props[key] = value
            }
            return true
        }
    })

    let Component = instance.vnode.type // 整个组件配置
    let {setup} = Component
    if (setup) {
        let context = createContext(instance)
        let setupReturn = setup(instance.props, context)
        handleSetupReturn(instance, setupReturn)
    }else {

    }
}
function createContext(instance) {
    return {
        attrs: instance.attrs,
        slots: instance.slots,
        emit: () => {},
        expose: () => {}
        // 如果用户使用了ref属性放到了组件上，expose默认拿到组件实例
        // 但如果定义了expose, 默认拿到expose
    }
}
function handleSetupReturn(instance, setupReturn) {
    if (isFunction(setupReturn)) {
        instance.render = setupReturn
    }else if(isObject(setupReturn)){
        instance.setupState = setupReturn
    }
    finishComponentSetup(instance)
}
/**
 * 完善实例
 * 1.补充render函数(有render直接用render,没render用template生成)
 */
function finishComponentSetup(instance) {
    let component = instance.vnode.type
    if (!instance.render) {
        if (!component.render && component.template) {
            // TODO: template转render, 存到配置中(component)
        }
        instance.render = component.render
    }
}