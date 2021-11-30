import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import store from "./store";
import Counter01 from './components/Counter01'
import Counter02 from './components/Counter02'

ReactDOM.render(
    <Provider store={store}>
        <Counter01/>
        <Counter02/>
    </Provider>
    , document.getElementById('root')
)