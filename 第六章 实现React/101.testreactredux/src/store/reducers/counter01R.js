import * as actionTypes from '../action-types'

let initialState = {number: 0}

function counter01R(preState = initialState, action) {
    switch (action.type) {
        case actionTypes.ADD1:
            return {number: preState.number + 1}
        case actionTypes.MINUS1:
            return {number: preState.number - 1}
        default:
            return preState
    }
}

export default counter01R