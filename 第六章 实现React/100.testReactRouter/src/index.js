// import React from "./core/react";
// import ReactDOM from "./core/react-dom";

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';

/**
 * react-router-dom@5.2.0
 *
 * exact表示精确匹配,/user就不会被/匹配到
 * <Switch></Switch> 表示只匹配一个, 匹配到就不向下匹配了
 */
ReactDOM.render(
    <Router>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Route path="/user" component={User}/>
            <Route path="/profile" component={Profile}/>
        </Switch>
    </Router>
    , document.getElementById('root')
);


/**
 * react-router-dom@6.0.2 出了新的写法
 *
 * 具体看文档:
 * https://blog.csdn.net/weixin_40906515/article/details/104957712
 * https://zhuanlan.zhihu.com/p/191419879
 */