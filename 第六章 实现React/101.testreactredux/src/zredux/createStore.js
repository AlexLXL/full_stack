function isPlainObject(obj) {
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }
    /**
     * let obj1 = {}
     * let obj2 = new Object()
     * obj2.__proto__ = Object.prototype
     */
    return Object.getPrototypeOf(obj) === Object.prototype
}

function createStore(reducer, initialState) {
    let state = initialState
    let listeners = []

    function dispatch(action) {
        // 判断是否纯对象
        if (!isPlainObject(action)) {
            throw new Error('action必须是纯对象')
        }
        state = reducer(state, action)
        listeners.forEach(l => l()) // 告诉各位配方变了
    }

    function getState() {
        return state
    }

    function subscribe(listener) {
        listeners.push(listener)
        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    dispatch({type:'@@REDXU/INIT'});

    return {
        dispatch,
        getState,
        subscribe, // 订阅配方变化
    }

}

export default createStore