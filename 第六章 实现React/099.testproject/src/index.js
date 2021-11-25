// import React from "./core/react";
// import ReactDOM from "./core/react-dom";

import React from "react";
import ReactDOM from "react-dom";

/**
 * 1.直接定义组件
 */
/*let element1 = (
    <h1 className="title" style={{ color: "red" }}>
        hello-world1
    </h1>
);
let element2 = React.createElement("h1", {
    className: "title",
    style: {
        color: 'red'
    }
}, "hello", React.createElement('span', null, 'world2'));
// 上面两个方式是等价的

ReactDOM.render(element2, document.getElementById("root"));*/

/**
 * 2.函数组件
 * 大写字母开头
 */
/*function ShopList(props) {
    return (
        <h1 id={props.id}  className="title" style={{ color: "red" }}>
            {props.title}
        </h1>
    )
}

ReactDOM.render(<ShopList id='sl1' title='hello-world3' />, document.getElementById("root"));*/

/**
 * 3.类组件
 */
/*class ShopList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return <h1 id={this.props.id}  className="title" style={{ color: "red" }}>
            {this.props.title}
        </h1>
    }
}

ReactDOM.render(<ShopList id='sl1' title='hello-world4' />, document.getElementById("root"));*/

/**
 * 4.类组件更新数据 (状态)
 */
class ShopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1
        };
    }
    handleClick = (event) => {
        this.setState({
            number: this.state.number + 1
        });
    }
    render() {
        return (
            <div>
                <p>{this.props.title}</p>
                <p>number:{this.state.number}</p>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
}

ReactDOM.render(<ShopList title='统计' />, document.getElementById("root"));
