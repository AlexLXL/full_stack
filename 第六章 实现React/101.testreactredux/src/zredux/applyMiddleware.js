/*import {compose} from "redux";

function applyMiddleware(...middlewares) {
    return function (createStore) {
        return function (reducer) {
            let store = createStore(reducer);
            let dispatch;
            //middlewareAPI是给中间用的，就向中间暴露的接口API，越少越好，越灵活越好
            //store传给middleware 1.中间件可以拿 到store任意属性 2.
            let middlewareAPI = {
                getState: store.getState,
                dispatch: action => dispatch(action)
            }
            let chain = middlewares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            };
        }
    }
}

export default applyMiddleware;*/

/**
 * 原理:
 * 1.compose组合函数
 * 2.利用原理1,如何链式调用3个中间件
 */

/**
 * 1.compose组合函数
 */
/*function add1(str) {
    return str + 1
}

function add2(str) {
    return str + 2
}

function add3(str) {
    return str + 3
}*/
/**
 * 需要组合成: add1(add2(add3(str)))
 */
/*function compose(...funcs) {
    /!*!// 这种写法的缺陷, add3参数个数被写死了
    return function (args) {
        for (let i = funcs.length - 1; i >= 0; i--) {
            args = funcs[i](args)
        }
        return args
    }*!/
    if (funcs.length === 0) {
        return (args) => args
    }else if (funcs.length === 1) {
        return funcs[0]
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
let r2 = compose(add1, add2, add3)('hello')
console.log(r2) // OUTPUT: hello321*/


/**
 * 2.如何链式调用3个中间件
 */
/*const getState = () => 0;
const dispatch = (action) => {
    console.log('原始的store.dispatch', action);
}
debugger
let store = {getState, dispatch};

function promise(store) {
    return function promise(next) {//add1
        return function (action) {//这个才是真正改造后store.dispatch
            console.log('promise');
            next(action);
        }
    }
}

function thunk(store) {
    return function thunk(next) {//add2
        return function (action) {
            console.log('thunk');
            next(action);
        }
    }
}

function logger(store) {
    return function logger(next) {//add3
        return function (action) {
            console.log('logger');
            next(action);
        }
    }
}

let middlewares = [promise, thunk, logger];
let chain = middlewares.map(middleware => middleware(store));
let composedFn = compose(...chain);
debugger
let newDispatch = composedFn(store.dispatch);
newDispatch({type: 'ADD'});

function compose(...funcs) {
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

//newDispatch
function composedFn(store_dispatch) {
    return promise(thunk(logger(store_dispatch)));
}*/

