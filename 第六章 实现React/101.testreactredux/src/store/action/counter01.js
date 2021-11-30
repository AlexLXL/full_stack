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
    },

    // 异步action（异步加1）
    thunkAdd1() {
        return function (dispatch, getState) {
            setTimeout(() => {
                dispatch({type: actionTypes.ADD1})
            }, 1000)
        }
    },
    // Promise
    promiseAdd1() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // 只能处理成功
                resolve({type: actionTypes.ADD1})
            }, 1000)
        })
    },
    promiseAdd2() {
        return {
            type: actionTypes.ADD1,
            data: new Promise((resolve, reject) => {
                setTimeout(() => {
                    let number = Math.random()
                    if (number >= .5) {
                        resolve({type: actionTypes.ADD1})
                    }else {
                        reject(number)
                    }
                }, 1000)
            })
        }
    }
}

export default counter01Actions