import React from "./core/react";
import ReactDOM from "./core/react-dom";

// import React from 'react'
// import ReactDOM from 'react-dom'

/**
 * 1. React.useState基础使用
 * @param props
 * @returns {*}
 * @constructor
 */
/*
function Counter(props) {
    let [number, setNumber] = React.useState(0)
    let [number1, setNumber1] = React.useState(10)
    let handleClick = () => {
        setNumber(number + 1)
        setNumber1(number1 + 1)
    }
    return (
        <div>
            <p>{number}</p>
            <p>{number1}</p>
            <button onClick={handleClick}>+</button>
        </div>
    )
}
ReactDOM.render(<Counter />, document.getElementById('root'))*/

/**
 * 2. React.useCallback、React.useMemo基础使用
 *
 * 目的: 在修改name的时候, 不触发Child重新渲染
 * @param props
 * @returns {*}
 * @constructor
 */
/*let Child = ({data, handleClick}) => {
    console.log('Child render');
    return (
        <button onClick={handleClick}>{data}</button>
    )
}
Child = React.memo(Child);

function App() {
    console.log('App render');
    const [name, setName] = React.useState('zhufeng');
    const [number, setNumber] = React.useState(0);
    /!**
     * 第一个参数是创建对象的工厂函数, 第二个参数是依赖变量的数组
     * 如果依赖中的一个变量发生变化，就会重新调用工厂方法创建新的对象
     * 否则就会重用上次的对象, 不再重新创建
     *!/
    let data = React.useMemo(() => ({number}), [number]) // 缓存对象
    let handleClick = React.useCallback(() => setNumber(number + 1), [number]); // 缓存回调函数
    // let data = {number})
    // let handleClick = () => setNumber(number + 1)
    return (
        <div id="test1">
            <input type="text" value={name} onChange={event => setName(event.target.value)}/>
            <Child data={number} handleClick={handleClick} />
        </div>
    )
}

ReactDOM.render(<App/>, document.getElementById('root'));*/

/**
 * 3. React.useReducer
 */
function reducer(state = {number: 0}, action) {
    switch (action.type) {
        case 'ADD':
            return {number: state.number + 1};
        case 'MINUS':
            return {number: state.number - 1};
        default:
            return state;
    }
}

function Counter() {
    const [state, dispatch] = React.useReducer(reducer, {number: 0});
    return (
        <div>
            Count: {state.number}
            <button onClick={() => dispatch({type: 'ADD'})}>+</button>
            <button onClick={() => dispatch({type: 'MINUS'})}>-</button>
        </div>
    )
}

ReactDOM.render(<Counter/>, document.getElementById('root'));
