import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

class Route extends React.Component {
    static contextType = RouterContext;

    render() {
        const {history, location} = this.context
        const {path, component: RouteComponent, exact = false, computedMatch, render, children} = this.props
        const match = computedMatch ? computedMatch : matchPath(location.pathname, this.props);
        // const match = exact ? location.pathname === path : location.pathname.startsWith(path)
        const routeProps = {history, location}
        // 匹配的时候返回组件, 否则返回null
        let renderElement = null
        /**
         * 指定一个route组件如何渲染有三种方式
         * 1.component  // 渲染固定组件
         * 2.render // 条件判断
         *  - 1/2都是匹配路径,然后渲染组件
         *
         * 3.childre
         *  - 不管路径是否匹配, 都渲染
         */
        if (match) {
            routeProps.match = match;
            if (RouteComponent) {
                renderElement = <RouteComponent {...routeProps}/>
            }else if (render) {
                renderElement = render(routeProps)
            }else if (children) {
                renderElement = children(routeProps)
            }else {
                renderElement = null
            }
        }else {
            if (children) {
                renderElement = children(routeProps)
            }else {
                renderElement = null
            }
        }
        return renderElement
    }
}

export default Route;

