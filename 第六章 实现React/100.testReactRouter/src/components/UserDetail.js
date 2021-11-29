import React, {Component} from 'react'
import {UserAPI} from '../utils/utils';

export default class UserDetail extends Component {
    state = {user: {}}

    componentDidMount() {
        let user = this.props.location.state;
        if (user) this.setState({user});
    }

    render() {
        let user = this.state.user;
        return (
            <div>
                <p>id:{user.id}</p>
                <p>name:{user.name}</p>
            </div>
        )
    }
}