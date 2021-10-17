/**
 * 修饰类、类属性、类方法、实例属性、实例方法, 默认参数不同
 */

/**
 * 修饰类: target-类的构造函数
 * 修饰类属性: target-类的构造函数, key-属性名
 * 修饰类方法: target-类的构造函数, key-方法名, descriptor-属性描述符
 * 修饰实例属性: target-显式原型, key-属性名
 * 修饰实例方法: target-显式原型, key-方法名, descriptor-属性描述符
 */

namespace temp02 {
    function classProp(targe, key) {
        console.log("target-类的构造函数, key-属性名")
    }
    function classFun(target, key, descriptor) {
        console.log("target-类的构造函数, key-方法名, descriptor-属性描述符")
    }
    function instanceProp(target, key) {
        console.log("target-显式原型, key-属性名")
        console.log("因为这是实例属性,而现在没有实例,所以返回显示原型")
    }
    function instanceFun(target, key, descriptor) {
        console.log("target-显式原型, key-方法名, descriptor-属性描述符")
        console.log("因为这是实例属性,而现在没有实例,所以返回显示原型")
    }
    class Person {
        @classProp
        static name01: string   // 类属性
        @classFun
        static getName01() {}   // 类方法
        @instanceProp
        name02: string  // 实例属性
        @instanceFun
        getName02() {}  // 实例方法
    }
}