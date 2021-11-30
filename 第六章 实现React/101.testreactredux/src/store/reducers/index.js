import {combineReducers} from 'redux'
import counter01R from './counter01'
import counter02R from './counter02'

let rootReducer = combineReducers({
    counter01R,
    counter02R
})

export default rootReducer