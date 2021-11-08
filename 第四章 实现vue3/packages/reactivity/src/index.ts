// 这样引入会耦合,且打包到一起
// import {vueShared} from "../../shared/src/index";


export {
    reactive,
    shallowReactive,
    readonly,
    shallowReadonly
} from './reactive'