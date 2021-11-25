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
/*class ShopList extends React.Component {
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
        /!**
         * 如果给原生组件添加ref属性, 那么当此虚拟dom转真实dom, 会把真实dom赋给this.aref.current
         *!/
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

ReactDOM.render(<ShopList id='sl1' title='ref基础使用' />, document.getElementById("root"));*/

/**
 * 5.ref使用（类组件嵌套时）
 */
/*class Form extends React.Component {
    constructor(props) {
        super(props);
        this.inputComponentRef = React.createRef()
    }
    handleClick = () => {
        this.inputComponentRef.current.handleClick()
    }
    render() {
        /!**
         * 如果给原生组件添加ref属性, 那么当此虚拟dom转真实dom, 会把真实dom赋给this.aref.current
         *!/
        return <div id={this.props.id}  className="title" style={{ color: "red" }}>
            <TextInput ref={this.inputComponentRef} />
            <button onClick={this.handleClick}>让TextInput聚焦</button>
        </div>
    }
}

class TextInput extends React.Component {
    constructor(props) {
        super(props);
        this.inputRef = React.createRef()
    }
    handleClick = () => {
        this.inputRef.current.focus()
    }
    render() {
        /!**
         * 如果给原生组件添加ref属性, 那么当此虚拟dom转真实dom, 会把真实dom赋给this.aref.current
         *!/
        return <input type="text" ref={this.inputRef} onClick={this.handleClick}/>
    }
}

ReactDOM.render(<Form />, document.getElementById("root"));*/



/**
 * 6.ref使用（类组件嵌套函数组件）
 */

/**
 * 不能对函数组件加ref,
 * 1.需要配合React.forwardRef使用
 * 2.函数组件需要加参数forwardRef和ref={forwardRef}
 * @param props
 * @returns {*}
 * @constructor
 */
/*
function TextInput(props, forwardRef) {
    return <input type="text" ref={forwardRef} />
}
let ForwardedTextInput = React.forwardRef(TextInput)

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.inputComponentRef = React.createRef()
    }
    handleClick = () => {
        this.inputComponentRef.current.focus()
    }
    render() {
        /!**
         * 如果给原生组件添加ref属性, 那么当此虚拟dom转真实dom, 会把真实dom赋给this.aref.current
         *!/
        return <div id={this.props.id}  className="title" style={{ color: "red" }}>
            <ForwardedTextInput ref={this.inputComponentRef} />
            <button onClick={this.handleClick}>让TextInput聚焦</button>
        </div>
    }
}

ReactDOM.render(<Form />, document.getElementById("root"));*/


/**
 * 7.生命周期的Mounting、Updation、Unmounting
 * 见: ./img/react15_lifecycle2.jpg
 */
class Counter extends React.Component {
    static defaultProps = {
        name: 'alex'
    }
    constructor(props) {
        super(props);
        this.state = {count: 0}
        console.log(`lifecycle-mounting 1_constructor`)
    }
    componentWillMount() {
        console.log(`lifecycle-mounting 2_componentWillMount`)
    }
    handleClick = (event) => {
        this.setState({count: this.state.count + 1})
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(`lifecycle-updation I_shouldComponentUpdate`)
        return nextState.count % 2 === 0    // 偶数更新
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(`lifecycle-updation II_componentWillUpdate`)
    }
    render() {
        console.log(`lifecycle-mounting 3_render`)
        return (
            <div>
                <p>count: {this.state.count}</p>
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
    componentDidMount() {
        console.log(`lifecycle-mounting 4_componentDidMount`)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`lifecycle-updation III_componentWillUpdate`)
    }
}


ReactDOM.render(<Counter />, document.getElementById("root"));
