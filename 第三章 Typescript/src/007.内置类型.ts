/**
 * 内置type
 */

/**
 * Exclude: U类型外的
 */
// type Exclude<T, U> = T extends U ? never : T
type ExcludeType = Exclude<string | number | boolean, number | boolean>

/**
 * Extract: 抽离U类型的
 */
// type Exclude<T, U> = T extends U ? T : never
type ExtractType = Extract<string | number | boolean, number | boolean>

/**
 * NonNullable:去除null和undefined
 */
// type NonNullable<T> = Exclude<T, null | undefined>
let el = document.getElementById('app') // el的类型为: HTMLElement | null
type NonNullableType = NonNullable<typeof el>   // 剩下HTMLElement

/**
 * Partial: 全部变为可选
 * 仅限第一层
 */
interface ICompany {
    name: string
    address: string
}

interface IPerson {
    name: string
    age: number
    company: ICompany
}
// type Partial<T> = { [k in keyof T]?: T[k] }
type PartialType = Partial<IPerson>

// type DeepPartial<T> = { [k in keyof T]?: T[k] extends object ? DeepPartial<T[k]> : T[k]}
// type DeepPartialType = DeepPartial<IPerson>
// let deepP: DeepPartialType = {
//     company: {
//         name: '公司名'
//     }
// }

/**
 * Required: 全部变为必选
 */
// type Required<T> = {[k in keyof T]-?: T[k]}
type RequiredType = Required<Partial<IPerson>>

/**
 * Readonly: 全部变为只读
 */
// type Readonly<T> = { readonly [k in keyof T]: T[k] }
type ReadonlyType = Readonly<IPerson>

/**
 * Pick: 从 '对象、接口' 中剪一部分
 */
// type Pick<T, K extends keyof T> = { [key in K]: T[key] }
type PickType = Pick<IPerson, 'name' | 'age'>

/**
 * Pick: 从 '对象、接口' 中删除一部分后剪出全部
 */
// type Omit<T, U extends keyof any> = Pick<T, Exclude<keyof T, U>>
type OmitType = Omit<IPerson, 'name'>

/**
 * Record: 描述对象类型
 */
// type Record<K extends keyof any, V> = { [k in K]: V }
function map<K extends keyof any, V, U>(obj: Record<K, V>, fn: (item: V, key: K) => U): Record<K, U> {
    let result = {} as Record<K, U>
    for (let k in obj) {
        result[k] = fn(obj[k], k)
    }
    return result
}
let obj = map({ name: 'tom', age: 1 }, function (item, key) {
    return 'aaa'
})


export default {}