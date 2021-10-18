/**
 * core-decorators - 正常我们自己写插件可以参考里面的
 * @readonly
 * @deprecate - 提示方法即将废弃
 */

/**
 * 实现一下@deprecate
 */
function deprecate(target, key, descriptor) {
    let oldMethod = descriptor.value
    descriptor.value = function (...args) {
        console.warn(`提示语句`)
        return oldMethod(...args)
    }
}


/**
 * 常用1: 防抖、节流（封装成装饰器）
 * 直接使用了vue的methods的方法上,例:
 *
 * @debounds(1000)
 * clickHandle
 */
// function debounce01(fn,delay){
//     let timer = null
//     return function() {
//         if(timer){
//             clearTimeout(timer)
//         }
//         timer = setTimeout(fn,delay)
//     }
// }
//
// function throttle01(fn, delay){
//     let valid = true
//     return function() {
//         if(!valid){
//             return false
//         }
//         valid = false
//         setTimeout(() => {
//             fn()
//             valid = true;
//         }, delay)
//     }
// }
//
// export let debounce = function(wait, options = {}) {
//     return function(target, name, descriptor) {
//         descriptor.value = debounce01(descriptor.value, wait, options)
//     }
// }
//
// export let throttle =  function(wait, options = {}) {
//     return function(target, name, descriptor) {
//         descriptor.value = throttle01(descriptor.value, wait, options)
//     }
// }

/**
 * vue中使用
 */
// <template>
//     <div>
//         <header class="componentRouterA"
//                 @mouseenter="mouseHandle"
//                 @mouseleave="mouseHandle"
//                 @mousemove="mouseHandle">07.routerA</header>
//     </div>
// </template>
//
// <script>
//     import { debounce } from "src/utils/decorator.js"
//     // import { throttle } from "src/utils/decorator.js"
//     export default {
//         name: "TestRouterA",
//         data: function () {
//             return {}
//         },
//         methods: {
//             @debounce(1000)
//             mouseHandle() {
//                 console.log("被点击")
//             }
//         },
//         mounted() {}
//     }
// </script>
//
// <style scoped>
//     .componentRouterA {
//         width: 100%;
//         height: 100px;
//         background-color: skyblue;
//     }
// </style>


/**
 * 常用2: 无痕埋点
 *
 * 场景: 统计所有页面内事件的点击量,统计页面的展现量pv uv
 * 代码: 正常都是埋在方法上, 单也可以直接埋在methods上
 * 链接： https://www.jianshu.com/p/467544cb088e
 */


/**
 * 常用3: AOP
 */

/**
 * 实现一下AOP的@before、@after
 */
function before(beforeFn) {
    return function (target, key, descriptor) {
        let oldMethod = descriptor.value
        descriptor.value = function () {
            beforeFn.apply(this, arguments)
            return oldMethod.apply(this, arguments)
        }
    }
}
function after(afterFn) {
    return function (target, key, descriptor) {
        let oldMethod = descriptor.value
        descriptor.value = function () {
            let result = oldMethod.apply(this, arguments)
            afterFn.apply(this, arguments)
            return result
        }
    }
}

/**
 * 常用4: React的高阶组件里面就是装饰器实现
 */