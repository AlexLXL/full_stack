import {initMixin} from "./init";
import {renderMixin} from "./render";
import {lifCycleMixin} from "./lifeCycle";
import {initGlobalAPI} from "./global-api";

function Vue(option) {
    this._init(option);
}

// vue内部的扩展方法
initMixin(Vue);
renderMixin(Vue);
lifCycleMixin(Vue);

// vue外部扩展方法(给用户使用)
initGlobalAPI(Vue);

export default Vue;
