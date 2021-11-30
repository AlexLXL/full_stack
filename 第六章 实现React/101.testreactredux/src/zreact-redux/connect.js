import React from "react";
import ReactReduxContext from "./ReactReduxContext";
import {bindActionCreators} from "redux";

/**
 * 写两版: 类组件和函数组件hook
 *
 * 高阶组件: 接受一个老组件, 返回一个新组件
 * mapStateToProps: // 把仓库状态 映射为 组件的属性对象
 * mapDispatchToProps: // 把仓库动作 映射为 组件的属性对象
 */
function connect(mapStateToProps, mapDispatchToProps) {
    return function (OldComponent) {
        return class extends React.Component {
            static contextType = ReactReduxContext
            constructor(props, context) {
                super(props);
                const {store} = context
                const {getState, subscribe, dispatch} = store
                this.state = mapStateToProps(getState())
                this.unsubscribe = subscribe(() => {
                    this.setState(mapStateToProps(getState()))
                })
                let dispatchProps = {}
                if (typeof mapDispatchToProps === "function") {
                    dispatchProps = mapDispatchToProps(dispatch)
                }else if (typeof mapDispatchToProps === 'object') {
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
                }
                this.dispatchProps = dispatchProps
            }
            render() {
                return <OldComponent {...this.props} {...this.state} {...this.dispatchProps}></OldComponent>
            }
            componentWillUnmount() {
                this.unsubscribe && this.unsubscribe()
            }
        }
    }
}

export default connect