/**
 * 中间件, 不管是什么功能, 格式是固定的
 * next - 原是的store.dispatch方法
 * 最内部函数 - 改造后的dispatch
 */
function thunk({getState, dispatch}) {
    return function (next) {
        return function (action) {
            if (typeof action === 'function') {
                return action(dispatch, getState)
            }
            return next(action)
        }
    }
}

export default thunk