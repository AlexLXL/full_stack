function createStore(reducer, initialState) {
    let state = initialState
    let listeners = []

    function dispatch(action) {
        state = reducer(state, action)
        listeners.forEach(l => l()) // 告诉各位配方变了
    }

    function getState() {
        return state
    }

    function subscribe(listener) {
        listeners.push(listener)
    }

    dispatch({type:'@@REDXU/INIT'});

    return {
        dispatch,
        getState,
        subscribe, // 订阅配方变化
    }

}

export default createStore