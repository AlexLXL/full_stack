import React, {Component} from 'react'
import {createStore, bindActionCreators} from 'redux'
import store from "../store";
import counter01Actions from "../store/action/counter01";
import counter01R from "../store/reducers/counter01";

let boundActions = bindActionCreators(counter01Actions, store.dispatch)

class Counter01 extends Component {
    state = {
        number: store.getState().counter01R.number
    };

    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={boundActions.add1}>+</button>
                <button onClick={boundActions.minus1}>-</button>
            </div>
        )
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({number: store.getState().counter01R.number})
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
}

export default Counter01