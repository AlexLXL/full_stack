import React, {Component} from 'react'
import {connect} from "react-redux";
import counter01Actions from "../store/action/counter01";

class Counter01 extends Component {
    render() {
        let {color, number, add1, minus1, changeColor1} = this.props
        return (
            <div style={{color: color}}>
                <p>{number}</p>
                <button onClick={add1}>+</button>
                <button onClick={minus1}>-</button>
                <button onClick={() => changeColor1('red')}>改成红色</button>
            </div>
        )
    }
}

// 把仓库状态 映射为 组件的属性对象
let mapStateToProps = state => state.counter01R
// 把仓库动作 映射为 组件的属性对象

export default connect(
    mapStateToProps,
    counter01Actions
)(Counter01)
// 执行connect的效果如下
// Counter01.props = {...state.counter1, ...actions}