/**
 * 适配器模式
 */

/**
 * 案例: 充电器电压适配器
 */

class Electricity {
    public voltage: number = 220;
    getVoltage() {
        return this.voltage
    }
}

abstract class Power {
    abstract transform(): number
}

// 适配器
class PowerAdapter extends Power{
    constructor(public electricity: Electricity) {
        super();
    }
    transform() {
        return this.electricity.getVoltage() * 0.1
    }
}

let adapter = new PowerAdapter(new Electricity())
console.log(adapter.transform())