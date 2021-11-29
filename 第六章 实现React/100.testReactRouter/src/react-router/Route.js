import React from 'react';
import RouterContext from './RouterContext';

class Route extends React.Component {
    static contextType = RouterContext;

    render() {
        const {history, location} = this.context
        const {path, component: RouteComponent, exact = false} = this.props
        const match = exact ? location.pathname === path : location.pathname.startsWith(path)
        const routeProps = {history, location}
        // 匹配的时候返回组件, 否则返回null
        let renderElement = null
        if (match) {
            renderElement = <RouteComponent {...routeProps}/>
        }
        return renderElement
    }
}

export default Route;

