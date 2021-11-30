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
            }else {
                next(action)
            }
        }
    }
}

export default promise