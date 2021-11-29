import React, {Component} from 'react'
import {createStore} from 'redux'

const ADD = 'ADD'
const MINUS = 'MINUS'
function add() {
    return {type: ADD}
}
function minus() {
    return {type: MINUS}
}

let initialState = {number: 0}
function reducer(preState, action) {
    switch(action.type) {
        case ADD:
            return {number: preState.number + 1}
        case MINUS:
            return {number: preState.number - 1}
        default:
            return preState
    }
}
let store = createStore(reducer, initialState)

class Counter01 extends Component{
    /**
     * 组件关联仓库的两种形式:
     *
     * 1.保存到组件的state里, 再在html使用
     * 2.直接在组件html里使用
     */
    state = {
        number: store.getState().number
    };
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => store.dispatch(add())}>+</button>
                <button onClick={() => store.dispatch(minus())}>-</button>
            </div>
        )
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({number: store.getState().number})
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
}

export default Counter01