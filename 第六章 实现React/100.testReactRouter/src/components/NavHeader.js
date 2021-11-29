import React, {Component} from 'react'
import {withRouter} from '../react-router-dom'

/**
 * route渲染出来的才会传, 但现在这个组件不在route里, 所以没有this.props.history
 *
 * 解决: 使用withRouter包裹
 */
class NavHeader extends Component {
    render() {
        return (
            <div onClick={() => this.props.history.push('/')}>
                {this.props.title}
            </div>
        )
    }
}

export default withRouter(NavHeader);