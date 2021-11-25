import { updateQueue } from './Component';

/**
 * 实现合成事件或者说事件委托
 * @param {*} dom DOM元素
 * @param {*} eventType  事件名
 * @param {*} eventHandler  事件回调
 */
export function addEvent(dom, eventType, eventHandler) {
    // 元素dom上添加_store属性保存自身的事件
    let store;
    if (dom._store) {
        store = dom._store;
    } else {
        dom._store = {};
        store = dom._store;
    }
    store[eventType] = eventHandler;    // store: {onclick: fn}
    if (!document[eventType]) {
        document[eventType] = dispatchEvent;
    }
}

/**
 * 不管点什么按钮，触发什么事件，最终执行的都是dispatchEvent
 * 在合成事件的处理函数里，状态的更新是批量的
 * @param {*} event 原生的事件对象 不同的浏览可能是不一样
 */
function dispatchEvent(event) {
    let { target, type } = event;
    let eventType = 'on' + type;

    updateQueue.isBatchingUpdate = true; // 批量更新, 将标志置为true

    let syntheticEvent = createSyntheticEvent(event);
    let currentTarget = target;

    let { _store } = currentTarget;
    let eventHandler = _store && _store[eventType]; // 获取当前dom的onclick的事件函数
    if (eventHandler) {
        eventHandler.call(target, syntheticEvent);// 执行当前dom的onclick的事件函数
    }

    updateQueue.isBatchingUpdate = false;
    updateQueue.batchUpdate();  // 批量更新
}

/**
 * 创建兼容性event对象, 如: 加一个方法stopPropagation, 只要调这个, 任何浏览器都停止冒泡
 * @param nativeEvent
 * @returns {{nativeEvent: *}}
 */
function createSyntheticEvent(nativeEvent) {
    let syntheticEvent = { nativeEvent };
    for (let key in nativeEvent) {
        syntheticEvent[key] = nativeEvent[key];
    }
    // 此处能做一些兼容性处理, 如: IE的禁止冒泡
    return syntheticEvent;
}