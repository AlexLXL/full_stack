/**
 * 条件类型
 */
interface Bird { a:1 }
interface Fish { a:2 }
interface Sky { a:3 }
interface Water { a:4 }

type MyType<T> = T extends Bird ? Sky : Water
type sky = MyType<Bird>
type water = MyType<Fish>
type skyAndWater = MyType<Bird | Fish>
// 最后一个设计到分发,会一个个传入,然后组合返回

export default {}