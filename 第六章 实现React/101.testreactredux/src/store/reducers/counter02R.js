import * as actionTypes from '../action-types'

let initialState = {number: 0, color: 'skyblue'}

function counter02R(preState = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD2:
            return {...preState, number: preState.number + 2}
        case actionTypes.MINUS2:
            return {...preState, number: preState.number - 2}
        case actionTypes.CHANGE_COLOR:
            return {...preState, color: action.data}
        default:
            return preState
    }
}

export default counter02R