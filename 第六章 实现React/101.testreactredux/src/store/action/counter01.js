import * as actionTypes from '../action-types'

let counter01Actions = {
    add1() {
        return {type: actionTypes.ADD1}
    },
    minus1() {
        return {type: actionTypes.MINUS1}
    }
}

export default counter01Actions