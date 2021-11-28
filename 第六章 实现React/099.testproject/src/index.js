// import React from "./core/react";
// import ReactDOM from "./core/react-dom";

import React from "react";
import ReactDOM from "react-dom";

// let ThemeContext = React.createContext()

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
/*class Counter extends React.Component {
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
                {this.state.count === 4 ? null : <ChildCounter count={this.state.count} />}
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
    handleClick = (event) => {
        this.setState({count: this.state.count + 1})
    }
}

class ChildCounter extends React.Component {
    constructor(props) {
        console.log(`子组件挂载 1_constructor`)
        super(props);
    }
    componentWillMount() {
        console.log(`子组件挂载 2_componentWillMount`)
    }
    componentWillReceiveProps(nextProps) {
        console.log(`子组件props更新 I_componentWillReceiveProps`)
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log(`子组件props更新 II_shouldComponentUpdate`)
        return nextProps.count % 3 == 0
    }
    componentWillUpdate(nextProps, nextState) {
        console.log(`子组件props更新 III_componentWillUpdate`)
    }
    render() {
        console.log(`子组件挂载 3.render`)

        return (
            <div style={{fontSze: '20px',color: 'blue'}}>我是子组件{this.props.count}</div>
        )
    }
    componentDidMount() {
        console.log(`子组件挂载 4_componentDidMount`)
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(`子组件props更新 IV_componentWillUpdate`)
    }
    componentWillUnmount() {
        console.log(`子组件卸载 1_componentWillUnmount`)
    }

    handleClick = (event) => {
        this.setState({count: this.state.count + 1})
    }
}

ReactDOM.render(<Counter />, document.getElementById("root"));*/

/**
 * 8.DOM-DIFF
 */
/*class WorkList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: ['A', 'B', 'C', 'D', 'E', 'F']
        }
    }
    handleClick = () => {
        this.setState({
            list: ['A', 'C', 'E', 'B', 'G']
        })
    }
    render() {
        return (
            <React.Fragment>
                <ul>
                    {
                        this.state.list.map(item => <li key={item}>{item}</li>)
                    }
                </ul>
                <button onClick={this.handleClick}>+</button>
            </React.Fragment>
        )
    }
}
ReactDOM.render(<WorkList />, document.getElementById('root'))*/

/**
 * 9.React16生命周期 - getDerivedStateFromProps
 */
/*class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0}
    }
    render() {
        return (
            <div>
                <p>count: {this.state.count}</p>
                <ChildCounter count={this.state.count} />
                <button onClick={this.handleClick}>+</button>
            </div>
        )
    }
    handleClick = (event) => {
        this.setState({count: this.state.count + 1})
    }
}

class ChildCounter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number: 0,
        }
    }
    /!**
     * 通过props修改该组件的this.state.number
     *!/
    static getDerivedStateFromProps(nextProps, prevState) {
        let { count } = nextProps
        if (count % 2 === 0) {
            return {number: count * 2}
        }else {
            return {number: count * 3}
        }
    }
    render() {
        return (
            <div>
                我是子组件{this.state.number}
            </div>
        )
    }
}

ReactDOM.render(<Counter />, document.getElementById("root"));*/

/**
 * 10.React16生命周期 - getSnapshotBeforeUpdate
 */
/*class ScrollList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: []
        }
        this.wrapperRef = React.createRef();
    }

    addMessage = () => {
        this.setState({
            messages: [`${this.state.messages.length}`, ...this.state.messages]
        })
    }

    /!**
     * getSnapshotBeforeUpdate
     *  - 给更新前来一个快照, 可以用于和更新后对比
     *  - 返回值给componentDidUpdate
     * @param prevProps
     * @param prevState
     * @returns {{prevScrollHeoght: number, prevScrollTop: *}}
     *!/
    getSnapshotBeforeUpdate(prevProps, prevState) {
        return {
            prevScrollTop: this.wrapperRef.current.scrollTop,
            prevScrollHeoght: this.wrapperRef.current.scrollHeight,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        let {prevScrollTop, prevScrollHeoght} = snapshot
        let scrollHeightDiff = this.wrapperRef.current.scrollHeight - prevScrollHeoght
        this.wrapperRef.current.scrollTop = prevScrollTop + scrollHeightDiff
    }

    componentDidMount() {
        this.timer = setInterval(() => {
            this.addMessage()
        }, 1000)
    }

    render() {
        let style = {
            height: '100px',
            width: '200px',
            border: '1px solid red',
            overflow: 'auto'
        }
        return (
            <div style={style} ref={this.wrapperRef}>
                {
                    this.state.messages.map((message, index) => (
                        <div key={index}>{message}</div>
                    ))
                }
            </div>
        )
    }

    handleClick = (event) => {
        this.setState({count: this.state.count + 1})
    }
}

ReactDOM.render(<ScrollList/>, document.getElementById("root"));*/

/**
 * 11.使用Context上下文, 用于爷孙组件通信
 * 类似vue的provide/inject
 *
 * 1. 创建context - let ThemeContext = React.createContext()
 * 2. 父组件传出去 - <ThemeContext.Provider value={value}> ...  </ThemeContext.Provider>
 * 3. 类子组件接收 - static contextType = ThemeContext
 * 4. 子类组件使用 - this.context.color
 *
 * 5. 函数组件接收、使用 - <ThemeContext.Consumer>{value => {}</ThemeContext.Consumer>
 */
/*class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'skyblue'
        }
    }

    changeColor = (color) => {
        this.setState({
            color
        })
    }

    render() {
        let value = {color: this.state.color, changeColor: this.changeColor}
        return (
            <ThemeContext.Provider value={value}>
                <div style={{border: `3px solid ${this.state.color}`, width: '200px', height: '300px', padding: '5px'}}>
                    Page
                    <Header />
                </div>
            </ThemeContext.Provider>
        );
    }
}

class Header extends React.Component {
    static contextType = ThemeContext
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={{border: `3px solid ${this.context.color}`, padding: '5px'}}>
                Header
                <Title />
            </div>
        )
    }
}

// class Title extends React.Component {
//     static contextType = ThemeContext
//     constructor(props) {
//         super(props);
//     }
//     render() {
//         return (
//             <div style={{border: `3px solid ${this.context.color}`, padding: '5px'}}>
//                 Title
//                 <button onClick={() => this.context.changeColor('orange')}>橙色</button>
//                 <button onClick={() => this.context.changeColor('greenyellow')}>黄色</button>
//             </div>
//         )
//     }
// }

function Title() {
    return (
        <ThemeContext.Consumer>
            {
                value => (
                    <div style={{border: `3px solid ${value.color}`, padding: '5px'}}>
                        Title
                        <button onClick={() => value.changeColor('orange')}>橙色</button>
                        <button onClick={() => value.changeColor('greenyellow')}>黄色</button>
                    </div>
                )
            }
        </ThemeContext.Consumer>
    )
}

ReactDOM.render(<Page/>, document.getElementById("root"));*/

/**
 * 12. 高阶组件
 *
 * 1. 属性代理
 * 2. 反向继承 - 比如我们有一个第三方组件, 我们不能改, 也不能继承, 但是想做一些修改或增强
 *
 */
/*// 1. 属性代理
const loading = message => OldComponent => {
    return class extends React.Component {
        render() {
            const state = {
                show: () => {
                    let div = document.createElement('div');
                    div.innerHTML = `<p id="loading" style="position:absolute;top:100px;z-index:10;background-color:yellowgreen">${message}</p>`;
                    document.body.appendChild(div);
                },
                hide: () => {
                    document.getElementById('loading').remove();
                }
            }
            return (
                <OldComponent {...this.props} {...state} />
            )
        }
    }
}

class Hello extends React.Component {
    render() {
        return <div>
            <p>{this.props.title}</p>
            <button onClick={this.props.show}>show</button>
            <button onClick={this.props.hide}>hide</button>
        </div>;
    }
}

let LoadingHello = loading('正在加载...')(Hello);
ReactDOM.render(<LoadingHello title="myTitle" />, document.getElementById('root'));*/
/*// 2. 反向继承
class Button extends React.Component {
    state = {name: '张三'}

    componentWillMount() {
        console.log('Button componentWillMount');
    }

    componentDidMount() {
        console.log('Button componentDidMount');
    }

    render() {
        console.log('Button render');
        return <button name={this.state.name} title={this.props.title}/>
    }
}

const wrapper = OldComponent => {
    return class NewComponent extends OldComponent {
        state = {number: 0}

        componentWillMount() {
            console.log('WrapperButton componentWillMount');
            super.componentWillMount();
        }

        componentDidMount() {
            console.log('WrapperButton componentDidMount');
            super.componentDidMount();
        }

        handleClick = () => {
            this.setState({number: this.state.number + 1});
        }

        render() {
            console.log('WrapperButton render');
            let renderElement = super.render(); // 1.调用父类的render方法, 返回虚拟dom
            let newProps = {
                ...renderElement.props,
                ...this.state,              // 2.给button扩展属性
                onClick: this.handleClick   // 3.给button扩展一个点击事件
            }
            return React.cloneElement(renderElement, newProps, this.state.number); // 给button元素扩展一个children显示this.state.number
        }
    }
}
let WrappedButton = wrapper(Button);
ReactDOM.render(<WrappedButton title="标题"/>, document.getElementById('root'));*/

/**
 * 13. renderProps基础使用
 * - 1. 普通写法
 * - 2. render写法
 * - 3. children写法
 * - 4. HOC写法
 *
 * - 详细的看 004.renderProp.md
 */
// 2. render写法
class MouseTracker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {x: 0, y: 0};
    }

    // 这个逻辑就只需要写一次, 具体显示交给子组件
    handleMouseMove = (event) => {
        this.setState({
            x: event.clientX,
            y: event.clientY
        });
    }

    render() {
        return (
            <div onMouseMove={this.handleMouseMove}>
                {this.props.render(this.state)}
            </div>
        );
    }
}

ReactDOM.render(<MouseTracker render={ params => (
    <React.Fragment>
        <h1>移动鼠标!</h1>
        <p>当前的鼠标位置是 ({params.x}, {params.y})</p>
    </React.Fragment>
)}/>, document.getElementById('root'));

