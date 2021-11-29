/**
 *
 * @param actionCreators 可以是函数(一个), 也可以是对象(多个)
 * @param dispatch
 */
function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        bindActionCreator(actionCreators, dispatch)
    }
    const boundActionCreators = {}
    for (let key in actionCreators) {
        let actionCreator = actionCreators[key]
        boundActionCreators[key] = bindActionCreator(actionCreator, dispatch)
    }
    return boundActionCreators
}

function bindActionCreator(actionCreators, dispatch) {
    return function (...args) {
        let action = actionCreators.apply(this, args)
        return dispatch(action)
    }
}

export default bindActionCreators