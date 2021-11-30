import React, {Component} from 'react'
import {connect} from "react-redux";
import counter02Actions from "../store/action/counter02";

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
)(Counter02)