import {isArray, isInteger} from "@vue/shared";

let effectsQueue = new Set()
let add = (effectsToAdd) => {
    if (effectsToAdd) {
        effectsToAdd.forEach(effect => effectsQueue.add(effect))
    }
}

export function effect(fn, options = { lazy: false }) {
    let effect = createReactiveEffect(fn, options)
    if (!options.lazy) {
        effect()
    }
    return effect
}

let uid = 0
let activeEffect;
function createReactiveEffect(fn, options) {
    const effect = function () {
        activeEffect = effect
        fn()
        activeEffect = null
    }
    effect.id = uid++
    effect._isEffect = true
    effect.raw = fn
    effect.deps = []
    effect.options = options
    return effect   // 返回一个套娃(fn)的函数
}

/**
 * 收集依赖的effect
 * 更新依赖的effect
 */
let targetMap = new WeakMap()
export function track(target, type, key) {
    // effect里拿值才有activeEffect
    if (!activeEffect) return
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, depsMap = new Map())
    }
    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, dep = new Set())
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
    }
}
export function trigger(target, key, value, type) {
    let depsMap = targetMap.get(target)
    if (!depsMap) return
    /**
     * 1.修改数组的length触发更新 [这时value为修改后数组长度]
     */
    if(isArray(target) && key === 'length') {
        // 边界处理: effect收集数组某个下标idx; 代码修改数组length为0或小于idx的值
        depsMap.forEach((effects, key) => {
            if (key === 'length' || value - 1 < key) {
                add(effects)
            }
        })
    }else {
        /**
         * 2.数组新增和对象新增（使用length的effects）
         * 3.基础数据/引用数据的值发生改变
         */
        if (type === 'add') {
            if (isArray(target) && isInteger(key)) {
                const effects = depsMap.get('length')
                add(effects)
            }else {
                add(depsMap.get(key))
            }
        }else {
            const effects = depsMap.get(key)
            add(effects)
        }
    }
    effectsQueue.forEach((effect: any) => effect())
}




