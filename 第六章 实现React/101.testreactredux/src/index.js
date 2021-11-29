/**
 * redux不需要依赖react
 */

import {createStore} from './redux'

// action
const ADD = 'ADD'
const MINUS = 'MINUS'

// 初始状态
let initialState = 0

// reducer
function reducer(preState, action) {
    switch (action.type) {
        case ADD:
            return preState + 1
        case MINUS:
            return preState - 1
        default:
            return preState
    }
}

// 开机
let store = createStore(reducer, initialState)
let counterValue = document.getElementById('counter-value')
let addBtn = document.getElementById('add-btn')
let minusBtn = document.getElementById('minus-btn')

function render() { counterValue.innerHTML = store.getState() }
render()
store.subscribe(render)
addBtn.addEventListener('click', () => {store.dispatch({type: 'ADD'})})
minusBtn.addEventListener('click', () => {store.dispatch({type: 'MINUS'})})