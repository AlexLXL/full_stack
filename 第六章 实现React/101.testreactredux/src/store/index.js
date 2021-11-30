import {createStore, bindActionCreators, applyMiddleware} from 'zredux'
import rootReducer from "./reducers";
import logger from '../redux-logger'
import thunk from '../redux-thunk'
import reduxPromise from '../redux-promise'

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


let store = applyMiddleware(reduxPromise)(createStore)(rootReducer)

export default store