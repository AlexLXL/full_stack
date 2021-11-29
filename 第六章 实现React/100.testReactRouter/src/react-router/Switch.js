import React from 'react';
import RouterContext from './RouterContext';
import matchPath from './matchPath';

class Swith extends React.Component {
    static contextType = RouterContext

    render() {
        const {context} = this;
        const {children} = this.props;
        const {location} = context;
        let element, match;
        React.Children.forEach(children, child => {
            //child $$typeof == Symbol('react.element')
            if (React.isValidElement(child)) {//如果此节点是一个React元素
                if (!match) {//如果尚未有任何元素匹配
                    element = child;
                    match = matchPath(location.pathname, child.props);
                }
            }
        });
        return match ? React.cloneElement(element, {computedMatch: match}) : null;
    }
}

export default Swith;