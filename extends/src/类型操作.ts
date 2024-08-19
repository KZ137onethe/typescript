// Header title: keyof 操作符
// keyof 运算符采用对象类型并生成其键的字符串或数字字面联合
type Point = { x: number, y: number }
type P = keyof Point // 等同于 type P = "x" | "y"

type Arrayish = { [n: number]: unknown }
type A = keyof Arrayish

type Mapish = { [k:string]: boolean }
type M = keyof Mapish
// M 是 string | number - 这是因为 JavaScript 对象键总是被强制转换为字符串，所以 obj[0] 总是与 obj["0"] 相同。
let abc: M = 123

// Header title: typeof 操作符
// JavaScript 上存在 typeof 操作符 [typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
// TypeScript 添加了一个 typeof 运算符，你可以在类型上下文中使用它来引用变量或属性的类型
let s1 = "hello"
let s2: typeof s1

type Predicate = (x: unknown) => boolean;
// ReturnType<T> 是 TypeScript 中的一个泛型类型，它返回函数类型 T 的返回类型
type K = ReturnType<Predicate>; // type K = boolean
const result1: K = false
function f() {
  return { x: 10, y: 3 }
}
type F = ReturnType<typeof f> // type F = { x: number, y: number }

// 在标识符（即变量名）或其属性上使用 typeof 是唯一合法的。
// let shouldContinue: typeof f('12121') // 这样会报错

// Header title: 索引访问类型
// 索引访问类型（Indexed Access Types）是一种特殊的类型，它允许你通过索引访问一个对象或数组类型的属性或元素。
// 当你有一个对象或数组的索引，并且需要知道这个索引对应的具体类型时，可以使用索引访问类型。
type Person = { age: number; name: string; alive: boolean }
type Age = Person['age']

type I1 = Person['age' | 'name']
type I2 = Person[keyof Person]
type I3 = Person['alive' | 'name']

// 使用 number 来获取数组元素的类型。我们可以将它与 typeof 结合起来，以方便地捕获数组字面量的元素类型
const MyArray = [
  {name: "Alice", age: 15},
  {name: "Bob", age: 23},
  {name: "Eve", age: 38},
]
type PersonInfo = typeof MyArray[number] // type PersonInfo = { name: string, age: number }
type Age1 = typeof MyArray[number]['age'] // type Age1 = number

// Header title: 条件类型
// 条件类型（Conditional Types）是 TypeScript 类型系统中的一种高级特性，它允许你根据类型条件来推断出一个新的类型。
// 条件类型的基本形式：T extends U ? X : Y
interface Animal {
  live(): void
}
interface Dog extends Animal {
  woof(): void
}
type Example1 = Dog extends Animal ? number : string
type Example2 = RegExp extends Animal ? number : string

// 可以和泛型一起使用
interface IdLabel {
  id: number
}
interface NameLabel {
  name: string
}

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel

function createLabel(id: number): IdLabel;
function createLabel(name: string): NameLabel;
function createLabel(nameOrId: string | number): IdLabel | NameLabel;
// function createLabel(nameOrId: string | number): IdLabel | NameLabel {
//   throw "unimplemented";
// }
function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented"
}

// throw 抛出错误后，后面的代码不可到达
try {
  throw 'abc'
}catch(e) {
  console.error(e)
}
let a = createLabel('typescript')
let b = createLabel(2.8)
let c = createLabel(Math.random() > 0.5 ? "hello" : 42)

// 条件类型约束
// 通常，条件类型的检查会为我们提供一些新信息。
// 就像使用类型保护进行缩小可以为我们提供更具体的类型一样，条件类型的真正分支将通过我们检查的类型进一步限制泛型。

type MessageOf<T extends { message: unknown }> = T['message']
interface Email {
  message: string;
}
type EmailMessageContents = MessageOf<Email>
// 和条件类型一起使用
type MessageOfTwo<T> = T extends { message: unknown } ? T['message'] : never
interface Dog {
  back(): void
}
type DogMessageContents = MessageOfTwo<Dog>

// 数组类型展平的类型, Flatten
type Flatten<T> = T extends any[] ? T[number] : T;
type Str = Flatten<string []>
type Num = Flatten<number []>

// 条件类型推断 infer
// 使用 infer 关键字从我们在 true 分支中比较的类型进行推断的方法。
type Foo = { kind: 'foo' }
type Bar = { kind: 'bar' }
type ExtractKind<T> = T extends { kind: infer K } ? K : never
type FooKind = ExtractKind<Foo> // "foo"
type BarKind = ExtractKind<Bar> // "bar"

type GetReturnType<Type> = Type extends (...args: never[]) => infer K ? K : never
type ReturnNumber = GetReturnType<() => number>
type ReturnString = GetReturnType<() => string>
type ReturnBooleans = GetReturnType<() => boolean[]>
// 当从具有多个调用签名的类型（例如: 重载函数的类型）进行推断时，会根据最后一个签名进行推断（这可能是最宽松的包罗万象的情况）。
// 无法根据参数类型列表执行重载决议。 => TypeScript 无法根据参数类型列表来解析哪个签名是最匹配的，它会直接使用最后一个签名作为推断的基础。
declare function stringOrNum(x: string): number;
declare function stringOrNum(x: string[] | [string, string, number, number], y: string): (string | number)[]
declare function stringOrNum(x: string | number): string | number;

type T1<T> = T extends ReturnType<typeof stringOrNum> ? T[] : never

const bcd: T1<number> = [1, 2, 3, 4, 5, 6]

// Header title: 分布式条件类型
// 当条件类型作用于泛型类型时，它们在给定联合类型时变得可分配。
type ToArray<Type> = Type extends any ? Type[] : never // ToArray 分布 string | number => ToArray<string> | ToArray<number> => string[] | number[]
type StrArrOrNumArr = ToArray<string | number> // string[] | number[]

// 想避免非期望行为时，可以将extends关键字的左右两侧括起来
type ToArrayNonDist<Type> = [Type] extends [any] ? Type[] : never
type ArrOfStrOrNum = ToArrayNonDist<string | number> // (string | number)[]
