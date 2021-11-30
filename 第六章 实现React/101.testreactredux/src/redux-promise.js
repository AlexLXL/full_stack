/**
 * 中间件, 不管是什么功能, 格式是固定的
 * next - 原是的store.dispatch方法
 * 最内部函数 - 改造后的dispatch
 */
function promise({getState, dispatch}) {
    return function (next) {
        return function (action) {
            // 判断是否promise
            if (action.then && typeof action.then === 'function') {
                action.then(dispatch).catch(dispatch)
            }else if (action.data && action.data.then && typeof action.data.then === 'function') {
                action.data.then((res) => {
                    dispatch({...action, data: res})
                }).catch((error) => {
                    dispatch({...action, data: error, error: error})
                    return Promise.reject(error)
                })
            }else {
                next(action)
            }
        }
    }
}

export default promise