import {createStore, bindActionCreators} from 'redux'
import rootReducer from "./reducers";

// let store = createStore(rootReducer)

/**
 * redux中间件
 * 实例1: 打印更新前后值
 * 实例2: 发请求
 *
 * 示例3.固定格式
 */
/*let oldDispatch = store.dispatch
store.dispatch = function (action) {
    console.log(`更新前:`, store.getState())
    oldDispatch(action)
    console.log(`更新后:`, store.getState())
}*/
/*let oldDispatch = store.dispatch
store.dispatch = function (action) {
    fetch('/test.json').then(res => {   // 只能访问public上的, 其他路径都会重定向
        return res.json()
    }).then(res => {
        console.log(res)
        oldDispatch(action)
    })
}*/
/**
 * 中间件, 不管是什么功能, 格式是固定的
 * next - 原是的store.dispatch方法
 * 最内部函数 - 改造后的dispatch
 */
function logger({getState, dispatch}) {
    return function (next) {
        return function (action) {
            console.log(`prev state`, getState())
            next(action)
            console.log(`next state`, getState())
        }
    }
}

function applyMiddleware(logger) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer) // 闭包
            let dispatch = logger(store)(store.dispatch)
            return {
                ...store,
                dispatch
            }
        }
    }
}

let store = applyMiddleware(logger)(createStore)(rootReducer)

export default store