import * as actionTypes from '../action-types'

let initialState = {number: 0, color: 'skyblue'}

function counter01R(preState = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD1:
            if (action.error) {
                return {...preState, number: -10000}
            }else {
                return {...preState, number: preState.number + 1}
            }
        case actionTypes.MINUS1:
            return {...preState, number: preState.number - 1}
        case actionTypes.CHANGE_COLOR:
            return {...preState, color: action.data}
        default:
            return preState
    }
}

export default counter01R