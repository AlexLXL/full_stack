import {createStore, bindActionCreators} from 'redux'
import rootReducer from "./reducers";

let store = createStore(rootReducer)

/**
 * redux中间件
 * 实例1: 打印更新前后值
 * 实例2: 发请求
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


export default store