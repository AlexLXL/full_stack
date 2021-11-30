import React, {Component} from 'react'
import {createStore, bindActionCreators} from 'redux'
import store from "../store";
import counter02Actions from "../store/action/counter02";
import counter01R from "../store/reducers/counter01";

let boundActions = bindActionCreators(counter02Actions, store.dispatch)

class Counter02 extends Component {
    state = {
        number: store.getState().counter02R.number
    };

    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={boundActions.add2}>+</button>
                <button onClick={boundActions.minus2}>-</button>
            </div>
        )
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({number: store.getState().counter02R.number})
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }
}

export default Counter02