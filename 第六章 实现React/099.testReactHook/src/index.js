import React from "./core/react";
import ReactDOM from "./core/react-dom";

// import React from 'react'
// import ReactDOM from 'react-dom'

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
ReactDOM.render(<Counter />, document.getElementById('root'))