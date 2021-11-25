import React from "./core/react";
import ReactDOM from "./core/react-dom";

// import React from "react";
// import ReactDOM from "react-dom";

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
/*class ShopList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 1
        };
    }
    handleClick = (event) => {
        this.setState({ number: this.state.number + 1 });
        console.log(this.state);
        this.setState({ number: this.state.number + 1 });
        console.log(this.state);
        this.setState((state) => ({ number: this.state.number + 1 }))
        console.log(this.state);
        // 因为是异步更新，所以上面的打印都不是最新值

        /!*
        setTimeout(() => {
            this.setState({number: this.state.number + 1});
            console.log(this.state);
            this.setState({number: this.state.number + 1});
            console.log(this.state);
        });
        // 在setTimeout里是同步更新
        *!/

        /!**
         * 总结: 在React管辖内的地方都是异步的,比如时间处理函数、生命周期函数
         * 在React管辖外的地方都是同步的, 比如setTimeout、setInternal、原生事件处理函数
         *!/
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

ReactDOM.render(<ShopList title='统计' />, document.getElementById("root"));*/

/**
 * 5.ref使用
 */
class ShopList extends React.Component {
    constructor(props) {
        super(props);
        this.aRef = React.createRef()
        this.bRef = React.createRef()
    }
    handleClick = () => {
        let b = this.bRef.current.value
        this.aRef.current.value = b
    }
    render() {
        /**
         * 如果给原生组件添加ref属性, 那么当此虚拟dom转真实dom, 会把真实dom赋给this.aref.current
         */
        return <div id={this.props.id}  className="title" style={{ color: "red" }}>
            <div>
                <input type="text" ref={this.aRef} onClick={this.handleClick} />
            </div>
            <div>
                <input type="text" ref={this.bRef} />
            </div>
        </div>
    }
}

ReactDOM.render(<ShopList id='sl1' title='ref基础使用' />, document.getElementById("root"));

