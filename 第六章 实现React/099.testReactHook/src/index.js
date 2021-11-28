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
/*function reducer(state = {number: 0}, action) {
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

ReactDOM.render(<Counter/>, document.getElementById('root'));*/


/**
 * 4. React.useContext
 */
/*const CounterContext = React.createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return {number: state.number + 1};
        case 'minus':
            return {number: state.number - 1};
        default:
            return state;
    }
}
function Counter(){
    let {state,dispatch} = React.useContext(CounterContext);
    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => dispatch({type: 'add'})}>+</button>
            <button onClick={() => dispatch({type: 'minus'})}>-</button>
        </div>
    )
}
function App(){
    const [state, dispatch] = React.useReducer(reducer, {number:0});
    return (
        <CounterContext.Provider value={{state,dispatch}}>
            <Counter/>
        </CounterContext.Provider>
    )
}

ReactDOM.render(<App/>,document.getElementById('root'));*/

/**
 * 5. React.useEffect
 */
/*function Counter() {
    console.log(`Counter render`)
    const [number, setNumber] = React.useState(0);
    // useEffect里的函数会在当前组件渲染到页面之后执行(类似componentDidMount)
    // 每次执行useEffect里的函数前,先会执行上次useEffect的返回值
    React.useEffect(() => {
        console.log('开启一个新的定时器')
        const $timer = setInterval(() => {
            setNumber(number => number + 1);
        }, 1000);
        return () => {
            console.log('销毁老的定时器');
            clearInterval($timer);
        }
    });
    return (
        <p>{number}</p>
    )
}

ReactDOM.render(<Counter/>, document.getElementById('root'));*/

/**
 * 6. React.useLayoutEffect和React.useRef
 */
/*function Animate () {
    const ref = React.useRef();
    React.useLayoutEffect(() => {
        console.log(`调用了React.useLayoutEffect`)
        ref.current.style.transition = `all 500ms`;
        ref.current.style.transform = `translate(250px)`;
    });
    let handleClick = () => {
        ref.current.style.transform = `translate(500px)`;
    }
    let style = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        backgroundColor: 'skyblue'
    }
    return (
        <div style={style} onClick={handleClick} ref={ref}></div>
    )
}
ReactDOM.render(<Animate/>, document.getElementById('root'));*/

/**
 * 7. React.useEffect
 */
function Child(props, ref) {
    const inputRef = React.useRef();
    // 定制暴露给父组件的ref值, 这里仅让外界调focus1方法
    React.useImperativeHandle(ref, () => (
        {
            focus1() {
                inputRef.current.focus();
            }
        }
    ));
    return (
        <input type="text" ref={inputRef}/>
    )
}

const ForwardChild = React.forwardRef(Child);

function Parent() {
    const inputRef = React.useRef();

    function getFocus() {
        inputRef.current.value = 'focus';
        inputRef.current.focus1();
    }

    return (
        <div>
            <ForwardChild ref={inputRef}/>
            <button onClick={getFocus}>获得焦点</button>
        </div>
    )
}

ReactDOM.render(<Parent/>, document.getElementById('root'));
