import React, {Component} from 'react';

export default class User extends React.Component {
    render() {
        console.log(this.props.location.state);
        return (
            <div>
                <p>User</p>
                <button onClick={() => this.props.history.goBack()}>返回</button>
            </div>
        )
    }
}