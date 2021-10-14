/**
 * 设计原则: SOLID
 *  O开闭原则: 对扩展是开放的，对修改是关闭的，即 "新增功能" 不能影响 “已有功能代码”
 *  S单一职责原则: 1.类方法不超过10个,类行数不超过100行,不然就应该拆分为多个class
 *               2.函数就做一件事!
 *  L里氏替换原则: 多态 + abstract,就是子类不能违法父类的功能和规定,总体来说类似多态。
 *  D依赖倒置原则: 1.依赖抽象而不是具体。2.只关心Interface而不关心具体类
 *  I接口隔离原则: 类似单一职责原则, 只做一件事, 但这个是针对Interface而言
 *                1.提高复用 2.低耦合 3.单一原则
 *
 *  迪米特法则: 类和类之间减少耦合,如公司人员管理(老板不会直接管开发,而是逐层管理)
 *  合成复用原则: 使用组合/聚合的方式,而不是继承
 */

/**
 * O开闭原则
 */
class Product {
    constructor(public name: string, public price: number) {}
    // Bad: (扩展会修改内部代码)
    getPriceBad(user: User) {
        switch (user.grade) {
            case "p1":
                return this.price * 0.9
            case "p2":
                return this.price * 0.8
            default:
                return this.price
        }
    }
    // Good: (扩展不会修改内部代码)
    getPrice(user: User) {
        return this.price * user.discounts
    }
}

class User {
    constructor(public grade: string, public discounts: number) {}
}

// let u1 = new User("p1", 0.9)
// let u2 = new User("p0", 1)
// let product = new Product("computed", 3000)
// console.log(product.getPriceBad(u1))    // 2700
// console.log(product.getPriceBad(u2))    // 3000
// console.log(product.getPrice(u1))   // 2700
// console.log(product.getPrice(u2))   // 3000

// 扩展到项目:
// 1.点击地图的switch-case(违背开闭原则): 可改成队列激活的方式(点击地图的函数不再扩展)
// 2.东莞app点击一个菜单->弹出子菜单列表->每次加子页面都要改父组件(违背开闭原则):
// 子菜单可以改成后台获取,也可以热配置图标/url/是否显示

/**
 * S单一职责原则:
 */
class Company {
    public name: string
    public address: string
    public scale: number
    // Bad
    updateInfo(name: string, address: string, scale: number) {
        this.name = name
        this.address = address
        this.scale = scale
    }
    // Good
    updateName(name: string) { this.name = name }
    updateAddress(address: string) { this.address = address }
    updateScale(scale: number) { this.scale = scale }
}

/**
 * L里氏替换原则:
 * 比如: 父类方法sum功能是求和,子类重写为求除,这就违背里氏替换原则
 * 整体来说类似多态 + abstract,区别多态是【实现基础】,里氏替换原则是【原则】
 */
abstract class AbstractBeverages {
    abstract getFlavour(): string;
}

class CocaCola extends AbstractBeverages {
    getFlavour(): string {
        return "甜";
    }
}

class Tea extends AbstractBeverages {
    getFlavour(): string {
        return "苦";
    }
}

class Customer {
    drink(beverages: AbstractBeverages) {
        console.log(beverages.getFlavour())
    }
}

// let customer = new Customer()
// let cocacola = new CocaCola()
// let tea = new Tea()
// customer.drink(cocacola)    // 甜
// customer.drink(tea)     // 苦

/**
 * D依赖倒置原则:
 * 例: 前面 002.什么是面向对象(day18-class18) 写的抽象就满足依赖倒置原则,只关注抽象/接口 不关注具体
 */
interface GirlFriend {
    age: number
    cook(): void
}

class GuanXiaoTong implements GirlFriend {
    age: number = 20
    cook(): void {
        console.log(`GuanXiaoTong煮饭`)
    }
}

class YangMi implements GirlFriend {
    age: number = 28
    cook(): void {
        console.log(`YangMi煮饭`)
    }
}

class Man {
    constructor(public girlFriend: GirlFriend) {}
}

// let guanXiaoTong = new GuanXiaoTong()
// let yangMi = new YangMi()
// let m1 = new Man(guanXiaoTong)
// let m2 = new Man(yangMi)

/**
 * I接口隔离原则
 */
// Bad
interface FRS {
    fly(): void
    run(): void
    swim(): void
}

// Good
interface fly { fly(): void }
interface run { run(): void }
interface swim { swim(): void }

class Amphibious implements run, swim {
    run(): void {}
    swim(): void {}
}

/**
 * 迪米特法则
 */
class CEO {
    public saleManage: SaleManager = new SaleManager()
    sale() {
        this.saleManage.sale()
    }
}

class SaleManager {
    public salesman: Array<Salesman> = [new Salesman("tom"), new Salesman("Jhon")]
    sale() {
        this.salesman.forEach(sale => {
            sale.sale()
        })
    }
}

class Salesman {
    constructor(public name: string) {}
    sale() {
        console.log(`${this.name}销售中。`)
    }
}

// let ceo = new CEO()
// ceo.sale()

/**
 * 合成复用原则
 */
class Classroom {
    // 聚合
    public compose: Array<Person>
}
class Person {}
class Teacher extends Person{}
class Student extends Person{}


class Cooker { cook() {console.log(`烹饪技能`)} }
class Person02 {
    // 组合
    private cooker: Cooker = new Cooker()
    cook() {
        this.cooker.cook()
    }
}
// let p2 = new Person02()
// p2.cook()