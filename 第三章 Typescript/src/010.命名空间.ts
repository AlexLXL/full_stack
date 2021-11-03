/**
 * 命名空间
 */

/**
 * 1.正常使用
 */
namespace zoom1 {
    export let a: number = 1    // 通过zoom.a访问
}

namespace zoom2 {
    export let a: number = 2
}

/**
 * 2.扩展函数的属性、类的静态属性和静态方法 (实例的属性和方法通过interface来改)
 */
function fn() {
}
namespace fn {
    export let a: number = 3
}
// console.log(fn.a)

interface Animal {
    c: string
    eat(): void
}
class Animal {}
namespace Animal {
    export let a: number = 4
    export let b = () => { console.log(5) }
}
// console.log(Animal.a)
// console.log(Animal.b)
// let dog = new Animal()
// console.log(dog.c)
// console.log(dog.eat)


/**
 * 进入全局空间
 */
declare global {
    // 扩展全局window
    interface Window {
        clientWidth: string
    }
}
window.clientWidth

/**
 * 声明文件
 * 如: jQuery从CDN引入, 告诉当前文件已经有$了
 * declare默认就是export的
 */
declare function $(selector: string): {
    css(val: string): void
}
declare namespace $ {
    namespace fn {
        function extend(): void
    }
}
$('app').css('color: red')
$.fn.extend()
// .d.ts中的声明文件

export default {}

