/**
 * 装饰器模式: 符合开闭原则
 * 1.用于扩展类方法和属性
 */

/**
 * 实现原理
 */
abstract class Shape {
    abstract draw(): void
}

class Circle extends Shape{
    draw(): void {
        console.log(`画圆`)
    }
}

class Rectangle extends Shape {
    draw(): void {
        console.log(`画矩形`)
    }
}

abstract class Color extends Shape {
    public constructor(public shape: Shape) {
        super();
    }
    abstract draw(): void
}

class Red extends Color {
    draw(): void {
        this.shape.draw()
        console.log(`涂红`)
    }
}

class Blue extends Color {
    draw(): void {
        this.shape.draw()
        console.log("涂蓝")
    }
}

// let redCircle = new Red(new Circle())
// redCircle.draw()
// let blueRectangle = new Blue(new Rectangle())
// blueRectangle.draw()


/**
 * 正常使用
 * 配置:
 * 1.vue-cli只需要修改eslintrc.js
 *      parserOptions: {
 *           parser: 'babel-eslint',
 *           ecmaFeatures: {
 *               legacyDecorators: true
 *           }
 *       },
 * 2.非vue-cli
 * babel-polyfill不能处理Decorator，需要一个插件
 * babel-plugin-transform-decortators-legacy
 */

namespace temp01 {
    interface Animal {
        swing: number;
        fly: Function;
    }
    // 修饰类时: target指向构造函数本身
    function flyable(target) {
        target.prototype.swing = 2
        target.prototype.fly = function () {
            console.log("we can fly")
        }
    }
    // 如果要传参, flyable改成返回函数就好
    @flyable
    class Animal {}
    
    // let bird = new Animal()
    // console.log(bird.swing)
    // bird.fly()
}