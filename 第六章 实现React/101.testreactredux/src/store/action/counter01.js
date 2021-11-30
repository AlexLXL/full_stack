import * as actionTypes from '../action-types'

let counter01Actions = {
    add1() {
        return {type: actionTypes.ADD1}
    },
    minus1() {
        return {type: actionTypes.MINUS1}
    },
    changeColor1(color) {
        return {type: actionTypes.CHANGE_COLOR, data: color}
    }
}

export default counter01Actions