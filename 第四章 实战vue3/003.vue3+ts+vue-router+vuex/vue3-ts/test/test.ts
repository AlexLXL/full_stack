// type Fas<T> = T extends {name: infer Tes} ? Tes : unknown
// type FasTest1 = Fas<{name: string}> // string
// type FasTest2 = Fas<{age: string}> // unknown

// interface IPerson1 {
//   name: string
// }
// interface IPerson2 {
//   age: number
// }
// type TPerson = IPerson1 & IPerson2
// let P4: TPerson = {
//   name: 'a',
//   age: 2
// }

// interface IPerson1 {
//   name: string
// }
// interface IPerson2 {
//   age: number
// }
// type TPerson = IPerson1 | IPerson2
// let P4: TPerson = {
//   name: 'c',
//   age: 2
// }

type T1 = string | number | boolean
type T2 = string | number
type ExcludeTest<T, U> = T extends U ? never : T; // 涉及到分发
type T3 = ExcludeTest<T1, T2>
let a: T3 = true


// type Exclude<T, U> = T extends U ? T : never
type ExtractType = Extract<string | number | boolean, number | boolean>