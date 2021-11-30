import * as actionTypes from '../action-types'

let counter02Actions = {
    add2() {
        return {type: actionTypes.ADD2}
    },
    minus2() {
        return {type: actionTypes.MINUS2}
    },
    changeColor2(color) {
        return {type: actionTypes.CHANGE_COLOR, data: color}
    }
}

export default counter02Actions