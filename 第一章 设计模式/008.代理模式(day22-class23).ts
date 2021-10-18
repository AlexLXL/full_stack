/**
 * 代理模式
 */

/**
 * 举例，明星接工作电话，一边先经过代理经纪人
 */
abstract class Istar {
    abstract answerPhone(): void
}

class AngelaBaby extends Istar {
    public name: string = "杨颖"
    public available: boolean = true
    answerPhone(): void {
        console.log(`杨颖接电话`)
    }
}

class AngelaBabyAgent extends Istar {
    public angelaBaby: AngelaBaby
    constructor() {
        super();
        this.angelaBaby = new AngelaBaby()
    }
    answerPhone(): void {
        if (this.angelaBaby.available) {
            this.angelaBaby.answerPhone()
        }else {
            console.log(`代理人接电话`)
        }
    }
}

let c = new AngelaBabyAgent()
c.answerPhone()
