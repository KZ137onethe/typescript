// Awaited<Type>
// 此类型旨在对 async 函数中的 await 或 Promise 中的 .then() 方法等操作进行建模 - 具体来说，他们递归地解开 Promise 的方式。
type A = Awaited<Promise<string>> // string
type B = Awaited<Promise<Promise<number>>> // number
type C = Awaited<boolean | Promise<number>> // boolean | number

/** Partial<Type>
 * 构造一个将 Type 的所有属性设置为可选的类型。此工具将返回一个表示给定类型的所有子集的类型。
 */
interface Todo {
  title: string,
  description: string
}

type UnTodo = Partial<Todo>

const todo1: Todo = {
  title: '洗漱',
  description: '刷牙洗脸'
}

const todo2: UnTodo = {
  title: '睡觉觉'
}

/** Required<Type>
 * Required<Type>返回一个新类型，将参数类型Type的所有属性变为必选属性。它与Partial<Type>的作用正好相反。
 */
interface Book {
  name: string,
  type: string,
  description?: string,
  recommend?: string
}
type StrictBook = Required<Book>
const book1: Book = {
  name: '信息论基础',
  type: '计算机',
}
const book2: StrictBook = {
  name: 'JavaScript高级程序设计',
  type: '程序',
  description: '1',
  recommend: 'very good!'
}

/** Readonly<Type>
 * 构造一个将 Type 的所有属性设置为 readonly 的类型，这意味着构造类型的属性不能重新分配。
 */
interface Alphabet {
  type: string,
  content: string[],
  description?: string
}
type OnlyAlphabet = Readonly<Alphabet>
const English: OnlyAlphabet = {
  type: 'English',
  content: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
  description: 'The English Alphabet consists of 26 letters.'
}

// English.description = '1' // 只读，不可修改

/** Record<Keys, Type>
 * 构造一个对象类型，其属性键为 Keys，其属性值为 Type。此工具可用于将一种类型的属性映射到另一种类型。
 */
type fruits = 'banana' | 'orange' | 'apple'
interface Fruit {
  price: number,
  maturityTime: string,
  placeOfOrigin: string
}
const someFruits: Record<fruits, Fruit> = {
  banana: { price: 12, maturityTime: '2024-7-15', placeOfOrigin: 'Ecuador' },
  orange: { price: 8, maturityTime: '2024-7-15', placeOfOrigin: 'Florida' },
  apple: { price: 15, maturityTime: '2024-7-15', placeOfOrigin: 'Washington' }
}

/** Pick<Type, Keys>
 * 通过从 Type 中选取一组属性 Keys（字符串字面或字符串字面的并集）来构造一个类型。
 */
interface Vegetable {
  price: number,
  maturityTime: string,
  placeOfOrigin: string,
  picture: string,
  introduce: string,
  growthCircle: string,
}
type VegetablePreview = Pick<Vegetable, 'price' | 'placeOfOrigin' | 'picture' | 'introduce'>
const cabbage: VegetablePreview = {
  price: 0.99,
  placeOfOrigin: '加利福尼亚',
  picture: 'cabbage.jpg',
  introduce: '卷心菜是一种绿叶、红色或白色的两年生植物，通常作为一年生蔬菜作物种植，以其紧密排列的叶片为特点。'
}

/** Omit<Type, Keys>
 * 通过从 Type 中选择所有属性然后删除 Keys（字符串字面或字符串字面的并集）来构造一个类型。与 Pick 相反。
 */
type VegetableGrow = Omit<Vegetable, 'price' | 'picture' | 'introduce'>
const potato: VegetableGrow = {
  maturityTime: '3 months',
  placeOfOrigin: '爱达荷州',
  growthCircle: '春到夏'
}

/** Exclude<UnionType, ExcludedMembers>
 * 通过从 UnionType 中排除所有可分配给 ExcludedMembers 的联合成员来构造一个类型
 */
type Shape = { kind: 'circle', radius: number } | { kind: 'square', sideLen: number } | { kind: 'triangle', sideLen: { x1: number, x2: number, x3: number } }
type Constant = '圆周率pi' | '自然对数的底e' | '黄金分割比φ' | '欧拉-马斯刻若尼常数γ' | '阿贝尔常数G'
type T1 = Exclude<Shape, { kind: 'circle' }>
type M1 = Exclude<Constant, '圆周率pi'>

const t1b2: T1 = {
  kind: 'square',
  sideLen: 5
}
const m1b1: M1 = '自然对数的底e'

/** Extract<Type, Union>
 * 通过从 Type 中提取所有可分配给 Union 的联合成员来构造一个类型
 */
type T2 = Extract<Shape, { kind: 'circle' }>
type M2 = { [K in Extract<Constant, '黄金分割比φ'>]: number}

const circle1: T2 = {
  kind: 'circle',
  radius: 11
}
const constant1: M2 = {
  '黄金分割比φ': 1.61803
}

/** NonNullable<Type>
 * 通过从 Type 中排除 null 和 undefined 来构造一个类型。
 */
type Data = string[] | string | null | undefined
type IsData = NonNullable<Data>

const data1 = ['1', '2', '3']

/** Parameters<Type>
 * 从函数类型 Type 的参数中使用的类型构造元组类型。
 */
type F0 = (s: string) => void
type F1 = (arg: { a: number, b: string }) => void
type F2 = (...args: number[]) => void
type F3 = () => string
type F4 = <T>(arg: T) => string
type F0Params = Parameters<F0>
type F1Params = Parameters<F1>
type F2Params = Parameters<F2>
type F3Params = Parameters<F3>
type F4Params = Parameters<F4> // => [arg: unknown]
type AnyParams = Parameters<any> // => unknown[]

const f0a1: F0Params = ['f0']
const f1b1: F1Params = [
  { a: 1, b: '1' }
]
const f2a1: F2Params = [1, 2, 3, 4, 5, 6]
const f3a1: F3Params = []
const f4a1: F4Params = ['111']
const any1: AnyParams = [1, 2, 3, { a: 1}, false, Symbol('1'), [1], 'abc']
const unknown2: unknown[] = [1, 2, 3, { a: 1}, false, Symbol('1'), [1], 'abc']
const any3: any[] = [1, 2, 3, {}, false, Symbol('1'), [1], 'abc']
// console.log(any1[0].toFixed()) //  Object is of type 'unknown'.
// console.log(unknown2[0].toFixed()) //  Object is of type 'unknown'.
// 说明 Parameters<any> 是 unknown[]
console.log(any3[0].toFixed())


/** ConstructorParameters<Type>
 * 从构造函数类型的类型构造元组或数组类型。它生成一个包含所有参数类型的元组类型（如果 Type 不是函数，则生成类型 never）。
 */
type ErrorParam = ConstructorParameters<ErrorConstructor>
type FunctionParam = ConstructorParameters<FunctionConstructor>
type RegExpParam = ConstructorParameters<RegExpConstructor>
type phoneSys = 'ios' | 'android'
class Phone {
  constructor(public name: string, public manufacturer: string, public sys: phoneSys) {}
}
type PhoneParam = ConstructorParameters<typeof Phone>
type AnyParam = ConstructorParameters<any> // unknown[]

const error1: ErrorParam = ['syntax error']
const foo: FunctionParam = ['log param1', 'log param2', 'log param3']
const phone_1: PhoneParam = ['MEIZU 20', '魅族', 'android']

/** ReturnType<Type>
 * 构造一个由函数 Type 的返回类型组成的类型。
 */
declare function foo1(): { a: number, b: string };
declare function foo2<T>(): T;
type returnStr = ReturnType<() => string>
type returnVoid = ReturnType<(...args: string[]) => void>
type returnUnknown = ReturnType<<T>() => T>
type returnNumberArr = ReturnType<<T extends U, U extends number[]>() => T>
type returnFoo1 = ReturnType<typeof foo1>
type returnFoo2 = ReturnType<typeof foo2<[number, boolean, string]>>

const f1: returnFoo1 = { a: 1, b: '2' }
const f2: returnFoo2 = [1, false, 'abc']
const str1: returnStr = '123'
const numArr1: returnNumberArr = [1, 2, 3, 4, 4]

/** InstanceType<Type>
 * 构造一个由 Type 中的构造函数的实例类型组成的类型。
 * Type 代表任意构造函数。
 */
class Store {
  constructor(public name: string, public category: string, private businessLicense: string) {}
}
type store = InstanceType<typeof Store>
const store1: store = new Store('芙蓉兴盛', '零售', 'x67sa89')
const store2: Store = new Store('星巴克', '咖啡饮品', 'abcdefg123')
// => store 和 Store 的用法是一致的，为什么需要InstanceType<Type>这种工具类型呢？
class ClassA {
  propertyA: string;
  constructor(value: string) {
    this.propertyA = value;
  }
}

// 作用
// 1.方便处理泛型类
class GenericClass<T> {
  property: T;
  constructor(value: T) {
    this.property = value
  }
}
type GenericInstance = InstanceType<typeof GenericClass<string>>
const instance1: GenericInstance = new GenericClass('Hello, world!')
// 2.元组或联合类型中的类
class ClassB {
  propertyB: number;
  constructor(value: number) {
    this.propertyB = value;
  }
}

type ClassTuple = [typeof ClassA, typeof ClassB];
type InstanceUnion = InstanceType<ClassTuple[number]>; // => InstanceType<ClassTuple[0] | ClassTuple[1]>

const instanceA: InstanceUnion = new ClassA("Hello");
const instanceB: InstanceUnion = new ClassB(42);

/** NoInfer<Type>
 * 阻止对所包含类型的推断。除了阻止推断之外，NoInfer<Type> 与 Type 相同。
 * 当你使用 NoInfer 时，你告诉 TypeScript 不要在泛型位置上推断出一个更宽泛的类型。
 * 这在某些情况下非常有用，尤其是当你不希望泛型参数被推断为联合类型或其他更宽泛的类型时。
 */
function createStreetLight<C extends string>(
    colors: C[],
    defaultColor: NoInfer<C>
){
  console.log(`defaultColor: ${defaultColor}, all colors: ${colors}`)
}

createStreetLight(['red', 'yellow', 'green'], 'red')
// createStreetLight(["red", "yellow", "green"], "blue");  // Error
function identity<T>(value: T): NoInfer<T> {
  return value;
}
let str = identity("hello"); // str 类型是 "hello"，而不是 string
let num = identity(42);      // num 类型是 42，而不是 number

/** ThisParameterType<Type>
 * 提取函数类型的 this 参数的类型，如果函数类型没有 this 参数，则提取 unknown。
 */
function toHex(this: number) {
  return this.toString(16)
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}

/** OmitThisParameter<Type>
 * 从 Type 中删除 this 参数。如果 Type 没有显式声明的 this 参数，则结果只是 Type。
 * 否则，将从 Type 创建一个没有 this 参数的新函数类型。
 * 泛型被删除，只有最后一个重载签名被传播到新的函数类型中。
 */
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
console.log(fiveToHex());

/** ThisType<Type>
 * 此工具不返回转换后的类型。相反，它用作上下文 this 类型的标记。
 */
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>; // Type of 'this' in methods is D & M
};

function makeObject<D, M>(desc: ObjectDescriptor<D, M>): D & M {
  let data: object = desc.data || {};
  let methods: object = desc.methods || {};
  return { ...data, ...methods } as D & M;
}

let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    moveBy(dx: number, dy: number) {
      this.x += dx; // Strongly typed this
      this.y += dy; // Strongly typed this
    },
  },
});

obj.x = 10;
obj.y = 20;
obj.moveBy(5, 5);

/** 内在字符串操作类型
 * 1. Uppercase<StringType>
 * 2. Lowercase<StringType>
 * 3. Capitalize<StringType>
 * 4. Uncapitalize<StringType>
 */

/** Uppercase<StringType>
 * 将字符串中的每个字符转换为大写版本。
 */
type Greeting1 = "Hello, world"
type ShoutyGreeting1 = Uppercase<Greeting1>

type ASCIICacheKey1<Str extends string> = `ID-${Uppercase<Str>}`
type MainID_1 = ASCIICacheKey1<"my_app">
/** Lowercase<StringType>
 * 将字符串中的每个字符转换为等效的小写字母。
 */
type Greeting2 = "Hello, world"
type ShoutyGreeting2 = Lowercase<Greeting2>

type ASCIICacheKey2<Str extends string> = `id-${Lowercase<Str>}`
type MainID_2 = ASCIICacheKey1<"MY_APP">
/** Capitalize<StringType>
 * 将字符串中的第一个字符转换为等效的大写字母。
 */
type LowercaseGreeting = "hello, world";
type Greeting3 = Capitalize<LowercaseGreeting>;
/** Uncapitalize<StringType>
 * 将字符串中的第一个字符转换为等效的小写字母。
 */
type UppercaseGreeting = "HELLO WORLD";
type UncomfortableGreeting = Uncapitalize<UppercaseGreeting>;
