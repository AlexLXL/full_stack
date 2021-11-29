// import React from "./core/react";
// import ReactDOM from "./core/react-dom";

import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router, Route, Switch, Redirect, Link, NavLink} from './react-router-dom';
import Home from './components/Home';
import User from './components/User';
import Profile from './components/Profile';
import Login from './components/Login';
import Protect from './components/Protect';

/**
 * react-router-dom@5.2.0
 *
 * exact表示精确匹配,/user就不会被/匹配到
 * <Switch></Switch> 表示只匹配一个, 匹配到就不向下匹配了
 * <Link></Link> 表示跳转标签, 其实就是a标签, (等比vue的router-link)
 */
ReactDOM.render(
    <Router>
        <ul>
            <li><NavLink to='/' activeClassName={"active11"} activeStyle={{color:'blue'}} exact>首页</NavLink></li>
            <li><NavLink to='/user' activeClassName={"active11"} activeStyle={{color:'blue'}}>用户</NavLink></li>
            <li><NavLink to='/profile' activeClassName={"active11"} activeStyle={{color:'blue'}}>个人中心</NavLink></li>
        </ul>
        <Switch>
            <Route path="/" component={Home} exact/>
            <Protect path="/user" component={User}/>
            <Route path="/login" component={Login}/>
            <Route path="/profile" component={Profile}/>
            <Redirect to="/" />
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