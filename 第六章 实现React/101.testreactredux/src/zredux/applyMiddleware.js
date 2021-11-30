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

export default applyMiddleware