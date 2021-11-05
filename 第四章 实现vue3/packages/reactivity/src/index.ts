// 这样引入会耦合,且打包到一起
// import {vueShared} from "../../shared/src/index";
import {vueShared} from "@vue/shared";
console.log(vueShared)

export let vueReactivity = "vueReactivity"