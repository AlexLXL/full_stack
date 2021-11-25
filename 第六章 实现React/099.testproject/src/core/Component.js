import {createDOM, findDOM} from './react-dom'

class Component {
    // 标识是react组件
    // 源码是通过Component.prototype.isReactComponent = true来标识
    static isReactComponent = true

    constructor(props) {
        this.props = props
        this.updater = new Updater(this)
    }

    setState(partialState) {
        this.updater.addState(partialState)
    }

    /**
     * 根据新的属性和状态, 计算要更新的虚拟DOM
     */
    forceUpdate() {
        let oldRenderVdom = this.oldRenderVdom
        let oldRealDOM = findDOM(oldRenderVdom)
        let newRenderVdom = this.render()
        compareToVdom(oldRealDOM.parentNode, oldRenderVdom, newRenderVdom)
        this.oldRenderVdom = newRenderVdom
    }
}

class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance
        this.pendingStates = []
    }

    addState(partialState) {
        // 存起来异步更新
        this.pendingStates.push(partialState)
        this.emitUpdate()
    }

    emitUpdate() {
        this.updateComponent();
    }

    updateComponent() {
        let {classInstance, pendingStates} = this
        if (pendingStates.length > 0) {
            shouldUpdate(classInstance, this.getState())
        }
    }

    getState() {
        let {classInstance, pendingStates} = this
        let {state} = classInstance
        pendingStates.forEach(partialState => {
            state = {...state, ...partialState}
        })
        pendingStates.length = 0
        return state
    }
}

function shouldUpdate(classInstance, nextState) {
    classInstance.state = nextState
    classInstance.forceUpdate() // 强制更新
}

export default Component