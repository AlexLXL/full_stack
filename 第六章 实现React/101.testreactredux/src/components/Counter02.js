import React, {Component} from 'react'
import {useSelector, useDispatch} from "react-redux";
import counter02Actions from "../store/action/counter02";

function Counter02() {
    let counter02 = useSelector(state => state.counter02R)
    let dispatch = useDispatch()
    let {number, color} = counter02
    return (
        <div style={{color: color}}>
            <p>{number}</p>
            <button onClick={() => dispatch(counter02Actions.add2())}>+</button>
            <button onClick={() => dispatch(counter02Actions.minus2())}>-</button>
            <button onClick={() => dispatch(counter02Actions.changeColor2('yellow'))}>改成黄色</button>
        </div>
    )
}

export default Counter02

/*
class Counter02 extends Component {
    render() {
        let {color, number, add2, minus2, changeColor2} = this.props
        return (
            <div style={{color: color}}>
                <p>{number}</p>
                <button onClick={add2}>+</button>
                <button onClick={minus2}>-</button>
                <button onClick={() => changeColor2('yellow')}>改成黄色</button>
            </div>
        )
    }
}

let mapStateToProps = state => state.counter02R
export default connect(
    mapStateToProps,
    counter02Actions
)(Counter02)*/
