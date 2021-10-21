import {isArray, isObject} from "../utils/utils";
import {arrayMethods} from "./array";
import {Dep} from "./dep";

export function observe(data) {
    if (!isObject(data)) return
    if (data.__ob__) return
    return new Observer(data)
}

class Observer {
    constructor(data) {
        // 添加dep保存在__ob__下,方便对象和数组调用而已。
        // 数组原本没存dep(对比上一条git),而对象是原本就有(现在加多一个__ob__.dep能添加属性的时候用)
        this.dep = new Dep()
        Object.defineProperty(data, "__ob__", {
            value: this,
            enumerable: false
        })
        if (isArray(data)) {
            data.__proto__ = arrayMethods
            this.observeArray(data)
        }else {
            this.walk(data)
        }
    }
    walk(data) {
        Object.keys(data).forEach((key) => {
            definedReactive(data, key, data[key])
        })
    }
    observeArray(arr) {
        arr.forEach(observe)
    }
}

/**
 * 性能问题1: 对象嵌套太多会影响性能
 * @param data
 * @param key
 * @param value
 * @returns {*}
 */
function definedReactive(data, key, value) {
    let dep = new Dep()
    let innerOb = observe(value)
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) {
                dep.depend()
                if (innerOb) {
                    innerOb.dep.depend()
                    if (isArray(value)) {
                        dependArray(value);
                    }
                }
            }
            return value
        },
        set(newValue) {
            if (newValue === value) return;
            if (isObject(newValue)) { observe(newValue) }
            value = newValue
            dep.notify()
        }
    })
}

/**
 * 边界问题处理:
 * 问题: 页面使用{{arr}};  data:{ arr = [[]] }; 进行修改arr[0].push(100)发现没触发更新
 * 解答: 这时只对arr最外层数组的__ob__.dep搜集了watcher, arr[0]没有搜集watcher,
 *       所以要递归给内部的也加上外部的watcher
 */
function dependArray(arr) {
    for(let i = 0; i < arr.length;i++){
        let current = arr[i];
        current.__ob__ && current.__ob__.dep.depend(); // 依赖收集
        if(isArray(current)) {
            dependArray(current);
        }
    }
}