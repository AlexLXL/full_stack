import {initMixin} from "./init";
import {renderMixin} from "./render";
import {lifCycleMixin} from "./lifeCycle";

function Vue(options) {
    this._init(options)
}

// 扩展原型
initMixin(Vue)
renderMixin(Vue)
lifCycleMixin(Vue)

export default Vue