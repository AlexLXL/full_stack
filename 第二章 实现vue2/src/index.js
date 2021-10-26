import {initMixin} from "./init";
import {renderMixin} from "./render";
import {lifCycleMixin} from "./lifeCycle";
import {initGlobalAPI} from "./globalAPI";

function Vue(options) {
    this._init(options)
}

// 扩展原型
initMixin(Vue)
renderMixin(Vue)
lifCycleMixin(Vue)
initGlobalAPI(Vue)

export default Vue