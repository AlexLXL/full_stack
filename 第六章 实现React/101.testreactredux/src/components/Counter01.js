import React, {Component} from 'react'
import {connect} from "zreact-redux";
import counter01Actions from "../store/action/counter01";
import * as actionTypes from "../store/action-types";

class Counter01 extends Component {
    render() {
        let {color, number, add1, minus1, changeColor1, thunkAdd1} = this.props
        return (
            <div style={{color: color}}>
                <p>{number}</p>
                <button onClick={add1}>+</button>
                <button onClick={minus1}>-</button>
                <button onClick={() => changeColor1('red')}>改成红色</button>
                <button onClick={thunkAdd1}>thunkAdd</button>
            </div>
        )
    }
}

// 把仓库状态 映射为 组件的属性对象
let mapStateToProps = state => state.counter01R
/*// 把仓库动作 映射为 组件的属性对象
let mapDispatchToProps = dispatch => ({
    add1() {
        dispatch({type: actionTypes.ADD1})
    },
    minus1() {
        dispatch({type: actionTypes.MINUS1})
    },
    changeColor1(color) {
        dispatch({type: actionTypes.CHANGE_COLOR, data: color})
    }
})*/
export default connect(
    mapStateToProps,
    // mapDispatchToProps, // 第一种写法, 传递一个写好的函数
    counter01Actions // 第二种写法, 传递一个对象, 由内部封装
)(Counter01)
// 执行connect的效果如下
// Counter01.props = {...state.counter1, ...actions}