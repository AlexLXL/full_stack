/**
 * 使用ProcessOn的UML画类图,代码实现: 继承、依赖、接口
 */

class Animal {
    public name: string;
    public age: number;
    public water: Water;    // 依赖Water
    constructor(name: string) {
        this.name = name
        this.age = 0
    }
    public eat() {}
    public drink() {}
}
// console.log(new Animal("yazi"))

class Water {}

class Bird extends Animal implements nest {  // 继承和实现
    public wing: boolean;
    public fly() {}
    nesting() { return true }
}

// 接口: 即功能的抽象
interface nest {
    nesting(): boolean;
}

class Swallow extends Bird {
    public father: Father
    public friend: Array<Firend>
    public wife: Wife
    public compose: Array<Feather>
}

class Father {}
class Firend {}
class Wife {}
class Feather {}
class SwallowGroup {
    public swallows: Array<Swallow>
}