import React, {Component} from 'react'
import {bindActionCreators} from 'zredux'
import store from "../store";
import counter02Actions from "../store/action/counter02";

let boundActions = bindActionCreators(counter02Actions, store.dispatch)

class Counter02 extends Component {
    state = {
        number: store.getState().counter02R.number,
        color: store.getState().counter02R.color
    };

    render() {
        return (
            <div style={{color: this.state.color}}>
                <p>{this.state.number}</p>
                <button onClick={boundActions.add2}>+</button>
                <button onClick={boundActions.minus2}>-</button>
                <button onClick={() => boundActions.changeColor2('yellow')}>改成黄色</button>
            </div>
        )
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                number: store.getState().counter02R.number,
                color: store.getState().counter02R.color
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
}

export default Counter02