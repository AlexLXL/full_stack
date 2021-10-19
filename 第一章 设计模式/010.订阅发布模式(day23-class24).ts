/**
 * 订阅发布模式:
 * 区别观察者模式: 多了一个中间channel, 属于完全解耦
 */

/**
 * 例子:
 * 房东 -> 中介 -> 房客
 * 1.房客订阅中介信息，
 * 2.房东发布信息给中介，
 * 3.中介推送信息
 */

class Landlord {
    constructor(public agent: Agent) {}
    lend() {
        this.agent.publish(`广州北京路出租一房一厅2000`)
    }

}

class Agent {
    public tenants: Tenant[] = []
    subscribe(listener: Tenant) {
        this.tenants.push(listener)
    }
    publish(message) {
        this.tenants.forEach((tenant) => {
            tenant.receive(message)
        })
    }
}

class Tenant {
    constructor(public name: string,public agent: Agent) {}
    order() {
        this.agent.subscribe(this)
    }
    receive(message) {
        console.log(`${this.name}接收到信息: ${message}`)
    }
}

let agent = new Agent()
let landlord = new Landlord(agent)
let c1 = new Tenant("小明", agent)
let c2 = new Tenant("小罐", agent)
c1.order()
// c2.order()
landlord.lend()