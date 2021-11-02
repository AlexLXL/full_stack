/**
 * 封装: public、protect、private
 *      - public: 本类、子类、其他类 可访问
 *      - protect: 本类、子类       可访问
 *      - private: 本类            可访问
 * super() 等效 parentClass.call(this)
 * readonly 只读属性-只能父类constructor内能修改
 * get/set方法 - 添加直接读取的属性, 场景: 访问私有属性
 */

class Animal {
    constructor(public name: string, public age: number) {
        this.name = name
        this.age = age
    }
    eat() {}
    drink() {}
    breathe() {}
}

// 2.public、get、set、abstract
class Dog extends Animal {
    public readonly DNA: string = '小狗DNA'
    private cryPrivate: string = "汪"
    constructor(name: string, age: number) {
        super(name, age);
    }
    get cry() {
        return this.cryPrivate
    }
    set cry(v: string) {
        this.cryPrivate = v
    }
}
// let d = new Dog('husky', 2)
// d.cry = '汪~'
// console.log(d.cry)    // husky

// 3.静态属性和静态方法(static)
class Cat extends Animal {
    static food: string[] = ['鱼']
    constructor(name: string, age: number) {
        super(name, age);
    }

    static Size() {
        return '大小30cm * 20cm'
    }
}
// console.log(Cat.food)
// console.log(Cat.Size())

// 4.装饰器模式
namespace test01 {
    function dig(target: Function) {
        target.prototype.digAble = true
        target.prototype.dig = function () {
            console.log("老鼠会挖地")
        }
    }
    interface Mouse {
        digAble: boolean;
        dig: Function;
    }
    @dig
    class Mouse extends Animal {
        constructor(name: string, age: number) {
            super(name, age);
        }
    }
    let m1 = new Mouse('米奇', 8)
    console.log(m1.digAble)
    m1.dig()
}

// 5.抽象类（abstract）
abstract class SuperStar {
    abstract answerPhone(): void
}

class AngelaBaby extends SuperStar {
    answerPhone(): void {
        console.log(`杨颖接电话`)
    }
}

export default {}