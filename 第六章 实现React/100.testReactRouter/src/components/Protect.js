import React from 'react'
import {Redirect, Route} from '../react-router-dom';

const Protected = (props) => {
    const {path, component: RouteComponent} = props;
    return (
        <Route path={path} render={
            (routeProps) => (
                localStorage.getItem('login') ? <RouteComponent {...routeProps}/> :
                    <Redirect to={{pathname: '/login', state: {from: path}}}/>
            )
        }
        />
    )
}
export default Protected;

/**
 * 指定一个route组件如何渲染有三种方式
 * 1.component  // 渲染固定组件
 * 2.render // 条件判断
 * 1/2都是匹配路径,然后渲染组件
 *
 * 3.childre
 * 3.不管路径是否匹配, 都渲染
 */