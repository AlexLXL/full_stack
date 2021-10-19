/**
 * 门面模式: 又叫外观模式
 * 可理解为适配器模式的固定调用 或 一个大模块包含各个小模块,而用户使用只面对大模块
 */

/**
 * 例子: 计算器
 */
class Add {
    add(a, b) {
        return a + b
    }
}
class Subtract {
    sub(a, b) {
        return a - b
    }
}
class Multiply {
    mul(a, b) {
        return a * b
    }
}
class Divide {
    div(a, b) {
        return a / b
    }
}
class Calculator {
    public add: Add = new Add()
    public subtract: Subtract = new Subtract()
    public multiply: Multiply = new Multiply()
    public divide: Divide = new Divide()
    addCalc(a, b) {
        return this.add.add(a, b)
    }
    subCalc(a, b) {
        return this.subtract.sub(a, b)
    }
    mulCalc(a, b) {
        return this.multiply.mul(a, b)
    }
    divCalc(a, b) {
        return this.divide.div(a, b)
    }
}
let calc = new Calculator()
console.log(calc.addCalc(2, 3))