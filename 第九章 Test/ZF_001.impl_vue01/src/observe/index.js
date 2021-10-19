import {isArray, isObject} from "../utils";
import {arrayMethods} from "./array";
import {Dep} from "./dep";

export function observe(value) {
    if (value.__ob__) return;
    if (!isObject(value)) return;

    return new Observer(value);
}

class Observer {
    constructor(value) {
        // 给对象添加dep(给数组添加值，给对象添加属性时调用该dep)
        this.dep = new Dep();

        // 1.标识值已经监控过
        // 2.方便array.js里调用监控数组的方法
        // 3.方便数组内的引用数据调用__ob__.dep更新页面
        Object.defineProperty(value, "__ob__", {
            value: this,
            enumerable: false
        })

        if (isArray(value)) {
            value.__proto__ = arrayMethods;
            this.observeArray(value);
        }else {
            this.walk(value);
        }
    }

    walk(data) {
        // 监控对象
        Object.keys(data).forEach((key) => {
            defineReactive(data, key, data[key]);
        })
    }

    observeArray(data) {
        // 监控数组
        data.forEach((item) => observe(item)); // 数组内的引用类型添加监控，[[], {}]
    }
}

function defineReactive(obj, key, value) {
    let childObj = observe(value); // 递归监控value
    let dep = new Dep(); // // 给对象属性添加dep
    Object.defineProperty(obj, key, {
        get() {
            if (Dep.target) {
                dep.depend();
                
                if (childObj) {
                    childObj.dep.depend();
                    if (isArray(value)) {
                        dependArray(value);
                    }
                }
            }
            return value;
        },
        set(newValue) {
            if (newValue === value) return;
            observe(newValue); // 新值加监控
            value = newValue;
            dep.notify();
        }
    })
}

function dependArray(value) { // 数组里的 引用类型 都收集依赖(更新watcher)
    for(let i = 0; i < value.length;i++){
        let current = value[i];
        current.__ob__ && current.__ob__.dep.depend(); // 依赖收集
        if(isArray(current)) {
            dependArray(current);
        }
    }
}