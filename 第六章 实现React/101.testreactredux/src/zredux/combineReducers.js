function combineReducers(reducers) {
    /**
     * state 老的总状态
     * action 动作
     */
    return function (state = {}, action) {
        let newState = {}
        for (let key in reducers) {
            newState[key] = reducers[key](state[key], action)
        }
        return newState
    }
}

export default combineReducers