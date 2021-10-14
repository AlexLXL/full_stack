/**
 * 什么是面向对象? 抽象、继承、封装、多态
 */

/**
 * 抽象
 * 1.存储,可以是各种数据库存储。因此需要把存储抽象出来
 */
interface InStorage {
    save(k: string, v: any): void;
    read(k: string): any;
}

class LocalStorage implements InStorage {
    save(k: string, v: any): void {
        // localStorage.setItem(k, v)
    }
    read(k: string): any {
        // return window.localStorage.getItem(k)
    }
}

class LocalMySql implements InStorage {
    save(k: string, v: any): void {
        // mySql.setItem(k, v)
    }
    read(k: string): any {
        // return localStorage.getItem(k)
    }
}

class UserInfo {
    public name: string
    public storage: InStorage
    constructor(name: string, storage: InStorage) {
        this.name = name
        this.storage = storage
    }
    save(k: string, v: any) {
        this.storage.save(k, v)
    }
    read(k: string) {
        this.storage.read(k)
    }
}

// let ls = new LocalStorage()
// let user = new UserInfo("admin", ls)
// user.save("permissions", "all")
// console.log(user.read("permissions"))   // node没有window和localStorage所以跑不了


/**
 * 继承
 */
class Biology {
    grow() {
        console.log("生物生长")
    }
}

class Germ extends Biology {}
// let g = new Germ()
// g.grow()


/**
 * 封装: public、protect、private
 * public: 本类、子类、其他类 可访问
 * protect: 本类、子类       可访问
 * private: 本类            可访问
 */
class Beast {
    public name: string
    protected skill: string
    private defect: string
    constructor(name: string, skill: string, defect: string) {
        this.name = name
        this.skill = skill
        this.defect = defect
    }
}

class FireApe extends Beast {
    constructor(name: string, skill: string, defect: string, public level: string) {
        super(name, skill, defect);
    }
    getSkill(): void {
        console.log(this.skill)
    }
    getDefect(): void {
        // console.log(this.defect) // 报错
    }
}
// let apeKing = new FireApe("猿王", "喷火", "水", "顶级")
// apeKing.name    // 正常访问
// apeKing.skill   // 报错
// apeKing.defect  // 报错


/**
 * 多态:
 * 1.子类重写父类方法(依赖继承属性)
 * 2.写一个函数调用该方法(根据传入的是父类还是子类会调用对应的方法)
 */
class Fruit {
    grow(): void {
        console.log(`水果成长`)
    }
}

class Apple extends Fruit {
    grow(): void {
        console.log(`苹果成长`)
    }
}

function showFuritGrow(f: Fruit) {
    f.grow()
}
let f = new Fruit()
let a = new Apple()
showFuritGrow(f)
showFuritGrow(a)
