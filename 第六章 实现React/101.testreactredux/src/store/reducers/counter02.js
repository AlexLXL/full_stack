import * as actionTypes from '../action-types'

let initialState = {number: 0}

function counter02R(preState = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD2:
            return {number: preState.number + 2}
        case actionTypes.MINUS2:
            return {number: preState.number - 2}
        default:
            return preState
    }
}

export default counter02R