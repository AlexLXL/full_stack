/**
 * Proxy API
 */
let data = {
    size: 1000,
    arr: ["a", "b", "c"]
}
let proxyData = new Proxy(data, {
    get(target: { arr: string[]; size: number }, p: PropertyKey, receiver: any): any {
        if (p === "size") {
            return target.size - 1
        }else {
            return target[p]
        }
    },
    set(target: { arr: string[]; size: number }, p: PropertyKey, value: any, receiver: any): boolean {
        if (p === "size") {
            if (value > 1000) {
                throw new Error(`设置值不能大于1000`)
                return false
            }else {
                target[p] = value
                return true
            }
        }
        return true
    }
})
console.log(proxyData.size) // 999
proxyData.size = 777
console.log(proxyData.size) // 776