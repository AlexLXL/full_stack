import {combineReducers} from 'zredux'
import counter01R from './counter01R'
import counter02R from './counter02R'

let rootReducer = combineReducers({
    counter01R,
    counter02R
})

export default rootReducer