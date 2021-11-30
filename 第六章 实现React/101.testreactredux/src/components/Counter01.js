import React, {Component} from 'react'
import {bindActionCreators} from 'zredux'
import store from "../store";
import counter01Actions from "../store/action/counter01";

let boundActions = bindActionCreators(counter01Actions, store.dispatch)

class Counter01 extends Component {
    state = {
        number: store.getState().counter01R.number,
        color: store.getState().counter01R.color
    };

    render() {
        return (
            <div style={{color: this.state.color}}>
                <p>{this.state.number}</p>
                <button onClick={boundActions.add1}>+</button>
                <button onClick={boundActions.minus1}>-</button>
                <button onClick={() => boundActions.changeColor1('red')}>改成红色</button>
            </div>
        )
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                number: store.getState().counter01R.number,
                color: store.getState().counter01R.color
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
}

export default Counter01