> 此仓库已废弃，移至：http://43.136.232.43:30086/YangHai/learn-typescript

## 介绍

TypeScript 是一种由微软开发的开源编程语言，是 JavaScript 的超集，支持静态类型检查和最终被编译为纯 JavaScript 执行。它通过类型系统提供更强大的代码编辑、重构、调试和维护能力，适合大型项目和团队协作。

### 参考
**视频**

1. [Dell-TypeScript 系统入门到项目实战](https://www.alipan.com/t/SdVsRD09wSM1VkvOF7CH)
2. [小满TypeScript基础教程全集](https://www.bilibili.com/video/BV1wR4y1377K/?spm_id_from=333.337.search-card.all.click&vd_source=1c6268f99220acd2592c93a3a87cbe31)

p15、p16、p21~36、p21(模块解析)讲的和JavaScript里面是一样的  
**文档**

1. [TypeScript 中文网](https://ts.nodejs.cn/)
2. [TypeScript](https://www.typescriptlang.org/)
3. [小满zs的TypeScript的收藏集](https://blog.csdn.net/qq1195566313/category_11559497.html?spm=1001.2014.3001.5515)
4. [阮一峰 TypeScript 教程](https://typescript.p6p.net/)

**训练场**：[TypeScript Playground](https://www.typescriptlang.org/zh/play/)

### 安装
```typescript
// 项目内安装
npm install typescript --save-dev
// 全局安装
npm install -g typescript
// 安装其他依赖
/**
  * 1. @types/node -- 支持node.js环境
  * 2. ts-node -- 可以直接运行TypeScript文件
  */
npm install @types/node @ts-node -D
```

---

## 类型
#### 基础类型
```typescript
// string  
// number  
// bigint  
// boolean  
// null  
// undefined  
const teacherName: string = "Dell";  
const count: number = 123;  
const population: bigint = BigInt("1234567890123456789012345678901234567890");  
const flag: boolean = true  
const a: null = null;  
const b: undefined = undefined;
```

**symbol 类型**  
TODO：等着做

#### 任意类型
+ **any 类型**

	any 类型代表任何值，但会失去TypeScript类型检测的作用

+ **unknown 类型**

	unknown 类型代表任何值，但使用 unknown 类型的值做任何事情都是不合法的。这类似于 any 类型，但更安全

```plain
function f1(a: any) {
    a.b(); // OK
}
function f2(a: unknown) {
    a.b(); // 'a' is of type 'unknown'.
}
```

+ any 和 unknown 的区别？
1. 使用 any 做任何事情都是合法的，使用 unknown 类型的值做任何事情都是不合法的
2. unknown 类型 是 top type，不能作为子类型，但 any 类型没有这个问题

```plain
// 这样写会报错unknow类型不能作为子类型只能作为父类型 any 可以作为父类型和子类型
// unknown类型不能赋值给其他类型
let name1: unknown = '123'
let name2: string = name1 
// 这样就没问题 any类型是可以的
let name3: any = '123'
let name4: string = name3
```

#### 字面类型
TODO：等着做

#### 接口与对象类型
+ **接口类型**

	可以通过 interface 关键字约束对象类型

```typescript
// ?. 可选  
// readonly 只读  
// [xxx: 类型] 任意类型  
interface Person {
  name: string
  age?: string,  
  readonly birthDay: string,  
  [propName: string]: any,  
  fn(): void,  
}
// 使用 extends
interface Teacher extends Person {
  school: string,
  teachAge: number
}
let tom: Teacher = {
  name: 'tom',
  age: 24,
  birthDay: "2000-09-08",
  school: 'xxx中学',
  teachAge: 2,
  fn() {
    console.log('fn')
  },
}
```

+ **对象类型**特殊类型 object 指的是任何非基础值（ string、number、bigint、boolean、symbol、null 或 undefined）。这与空对象类型 { } 不同，也与全局类型Object 不同。你很可能永远不会使用 Object。

#### 数组和元组类型
+ **数组类型**

```typescript
// 类型[]  
// arguments类数组: IArguments  
// 泛型数组  
let arr: number[] = [1, 2, 3, 4]  
let arr2: (number | string)[] = [1, "2", 3, "ok"]
function fn(...args: number[]) {  
  return arguments  
}
let arr3: Array<string> = ['1', '2', '3']  
// IArguments 是 TypeSCript 已经定义好的 => 类似：  
interface IArguments {  
  [index: number]: any;  
  length: number;  
  callee: Function;  
}
```

+ **元组类型**

	元组（Tuple）是固定数量的不同类型的元素的组合

```plain
const teacherInfo: [string, string, number] = ["Dell", "Alice", 88];  
const teacherInfo: readonly [string, string, number, number, boolean] = ["Tom", "male", 28, 5, true];
```

	应用场景：csv格式的数据等，示例：

```plain
const teacherList: [string, string, number][] = [
  ["dell", "male", 18],
  ["sun", "female", 22],
  ["jeny", "female", 28],
]
```

#### never和void类型
+ **never类型**

	TypeScript 将使用 never 类型来表示不应该存在的状态

```plain
function error(message: string): never  {  
    throw new Error(message)  
}
function loop(): never {  
    while(true){}  
}
```

  <u>应用场景</u>:

```typescript
// 假如 switch 的 default不可达
function select(type: string) {
  switch(type) {
    case 'test':
      // ...
      return 'test'
      break
    default:
      return type as never
  }
}
```

+ **void类型**

	表示不返回值的函数的返回值，只要函数没有任何 `return` 语句，或者没有从这些返回语句返回任何显式值，它就是推断类型

```typescript
function log(msg): void {  
  console.log(msg)  
}
```

#### 枚举类型
+ **特性:**
1. 自增长特性常量成员从第一个成员开始自动递增。如果没有显式地为成员赋值，它将从 0 开始，并且后续的成员会自动递增。

```typescript
enum Direction {  
    North, // 0  
    East,  // 1  
    South, // 2  
    West   // 3  
}  
enum Colors {  
    red = 1,  
    green = "abc",  
    orange = 3,  
    pink, // 4  
    blue, // 5  
}
```

2. 反向映射特性   除了为成员创建具有属性名称的对象外，**数字枚举成员**还获得从枚举值到枚举名称的反向映射。

```typescript
enum Enum {  
  A, // 0  
}  
let a = Enum.A;  
let nameOfA = Enum[a];
```

+ **场景：**

```typescript
enum Types {  
  Red, // 0  
  Green = 5, // 5  
  Blue // 6  
}  
console.log(Types.Red) // 0
```

    - 数字枚举
    - 字符串枚举在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
    - 异构枚举枚举可以混合字符串和数字成员
    - 接口枚举

```typescript
enum Types {  
    yyds,  
    dddd  
}  
interface A {  
    red: Types.yyds  
}  
let obj: A = {  
    red: Types.yyds  
}
```

    - const枚举大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 `const`枚举。 常量枚举通过在枚举上使用 const 修饰符来定义。且const 声明编译后为常量。

```typescript
const enum Types {
  No = "No",
  Yes = 1,
}
```

#### 类型推论和类型别名
+ **类型推论**TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是**类型推论**当变量被类型推断为一种类型时，不能够在给变量赋值的时候给别的类型如果你声明变量没有定义类型也没有赋值这时候TS会推断成any类型

```typescript
let a = "123456" //  被类型推断为string
a = 123456 // 不能将类型“number”分配给类型“string”。ts(2322)
let value // 被类型推断为any
```

+ **类型别名**通过 type 使用同一个类型并用一个名称引用它，叫做类型别名

```typescript
// 基础用法
type str = string
type strFn = () => string
type strOrNum = string | number
type success = 'ok' | 1 | true
type FnType = {
    name: string,
    age: number,
    sex: string,
    teachAge: number,
}
```

类型别名 type 和接口 interface 的区别：

```typescript
// 重复命名的区别
// 类型别名不能重复命名
type abc = number
type abc = string  // Duplicate identifier 'abc'.(2300)
// 重复命名 interface 会合并
interface FooFn {
  school: string,
  info: object,
}
interface FooFn {
  age: number
}
let highSchool: FooFn = {
  school: "xxx中学",
  info: {  
  },
  age: 12
}
// 类型合并的区别
interface Person {
  name: string,
  age: number,
}
interface Teacher extends Person {
  school: string,
  teachAge: number
}
type personType = {
  name: string,
  age: number,
}
type teacherType = {
  school: string,
  teachAge: number
} & personType
let tom: Teacher = {
  name: 'tom',
  age: 27,
  school: "xxx",
  teachAge: 4
}
let mary: teacherType = {
  name: 'mary',
  age: 34,
  school: 'xxx',
  teachAge:9
}
// type 使用操作符
let random1 = 1
// 获取变量的类型
type n = typeof random1
// 获取interface的属性名 
type keyOfType = keyof Teacher // "name" | "age" | "school" | "teachAge"
type IsNumber<T> = T extends number ? true : false
class NewNumber extends Number {}
let result: IsNumber<NewNumber> = false; // 只能是false
console.log(result)
```

    1. type不能重复命名，重复命名 interface 会合并
    2. interface 用于约束对象（函数也属于对象），type 没有这个限制
    3. 将两个及其以上的类型合并时，interface 往往通过继承来实现（也可以通过交叉类型&），而 type 只能通过交叉类型&来实现
    4. type 可以定义联合类型和可以使用一些操作符，而 interface 不行

#### 联合类型和交叉类型
+ **联合类型**联合类型是由两种或多种其他类型组成的类型，表示可能是这些类型中的任何一种的值。我们将这些类型中的每一种都称为联合的成员。

```typescript
let a: number | string = "123"
a = 123
function printId(id: number | string) {
    console.log("Your ID is: " + id);
}
printId("202")
printId(101)
```

如果你有一个联合类型的值，你如何处理它？TypeScript 只有在对联合的每个成员都有效的情况下才允许操作。例如，如果你有联合 string | number，则不能使用仅在 string 上可用的方法：

```plain
function printId(id: number | string) {
    console.log(id.toUpperCase()) // 将会报错
}
```

通过TypeScript的类型推论来缩小联合，比如：

```plain
function printId(id: number | string) {
    if(typeof id === "string") {
        console.log(id.toUpperCase());
    } else {
        console.log(id)
    }
}
```

+ **交叉类型**交叉类型是使用 & 运算符定义的

```typescript
interface Colorful {
    color: string;
}
interface Circle {
    radius: number;
}
type ColorfulCircle = Colorful & Circle
function draw(obj: ColorfulCircle) {
    console.log(obj.color, obj.radius)
}
draw({ color: 'red', radius: 10 })
// 理论上可以通过交叉类型把类型别名和接口进行混用,但可读性有点不好 - 只要明白你在做什么就行.png
// 数组和字符串都有slice方法，所以下面的交集类型 b 是有效的
type a = any[] | string
interface fnType {
    slice: Function
}
type b = a & fnType
let c: b = [1, 2, 3, 4]
console.log(c.slice(2))
```

#### 类型断言
有时候，你非常清楚一个值的类型信息但TypeScript无法知道的值类型的信息，这时候就可以`as`使用**类型断言**

```plain
// 当你清楚获取的元素必然是 HTMLCanvasElement
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// 类型断言的另一种写法（尖括号写法）
interface Person { name: string; age: number; } 
let people: any[] = [ 
    { name: "Alice", age: 25 }, 
    { name: "Bob", age: 30 }, 
    { name: "Charlie", age: 35 } 
];
let names:string[] = people.map(person => (<Person>person).name);
console.log(names);
// 当TypeScript明确知道（类型推论）一个值的类型时使用类型断言将会报错
// Conversion of type 'number' to type 'boolean' may be a mistake because neither type sufficiently overlaps with the other. If this was intentional, convert the expression to 'unknown' first.(2352)
const value = 123 as boolean 
// 当你故意将一种类型断言为另一种类型时，这其实是在欺骗TypeScript，没有任何意义
function fn(param: any): boolean {
    return param as boolean
}
console.log(fn('123'))
```

TypeScript 只允许类型断言转换为更具体或更不具体的类型版本。  
有时，此规则可能过于保守，并且不允许可能有效的更复杂的强制转换。如果发生这种情况，你可以使用两个断言，然后是所需的类型：

```plain
// declare 是 TypeScript 中用于声明类型和接口、模块、全局变量和函数等。
declare const expr: any;
type T = { a: 1, b: 2, c:3 };
const a = expr as any as T; // 或者 expr as unknown as T
```

使用类型断言缩小类型

```plain
interface A {
    run: string
}
interface B {
    build: string
}
function fn(type: A | B): void {
    console.log((type as A).run);
}
```

> 类型断言编译后被编译器删除，不会影响代码的运行时行为。
>

**非空断言运算符 !**

用于告诉编译器某个表达式不会是 null 或 undefined。当你确定某个值一定不会是 `null` 或 `undefined` 时，可以使用这个运算符来避免编译器发出错误或警告。

```plain
interface User {
    name?: string;
    age?: number;
}
const getUser = (): User => {
    return { name: "John", age: 30 };
};
const user = getUser();
const userName = user.name!;
console.log(userName.toUpperCase()); // 输出: John
```

#### 类型缩小
+ typeof
+ 真值
+ 相等性缩小
+ in 缩小
+ instanceof 缩小
+ 赋值
+ 类型谓词 is
+ 类型断言
+ 类型联合
+ 判别联合
+ never 穷举检查

#### 类型操作
###### 泛型
也称之为"动态类型"

```plain
function returnArray<T>(a: T, b: T): Array<T> {
    return [a, b]
}
// 使用类型参数推断
returnArray(1, 2)
returnArray('tom', 'bob')
// 传递类型参数
returnArray<number | string>(1, '2')
// 使用多个参数
function logLen<T, K, L>(param1: T[], param2: K[], param3: L[]): number {
    return ([] as any[]).concat(param1).concat(param2).concat(param3).length
}
logLen(['q', 'w', 'e', 'r'], [ 98, 103, 42, 5], [false, true, false])
// 使用泛型参数默认值，为什么有默认值？
function getRandomValue<T = number>(params: T[]): T {
    return Math.round(Math.random() * params.length)
}
// 在类型别名和接口中使用泛型
type A<T> = number | string | T
interface Box<T> {
    content: T,
    size: number
}
let abc: A<boolean> = true
let stringBox: Box<string> = {
    content: "Hello World!",
    size: 10
}
// 使用泛型类
class GenericBox<T> {
    constructor(private content: T) {};
    getContent(): T {
        return this.content
    }
    setContent(value: T): void {
        this.content = value
    }
}
```

TODO： TypeScript 类型推断泛型？  
**泛型类型**  
TODO  
**泛型的类型约束**

意思是泛型受到约束

```plain
// 通过 extends 继承父类来实现约束
function slice<T extends String | any[]>(param: T) {
    return param.slice(0, Math.floor(param.length / 2))
}
slice('3.1415926')
slice(['q', 'w', 'e', 'r', 't', 'y'])
interface Point {
    x: number,
    y: number
}
// 通过接口来类型约束
function getPointDistance<T extends Point>(point1: T, point2: T): number {
    return Math.sqrt(Math.pow(point1.x - point2.x) + Math.pow(point1.y - point2.y))
}
// 在泛型约束中使用类型参数 
// keyof 运算符采用对象类型并生成其键的字符串或数字字面联合
function getValue<T extends object, K extends keyof T>(obj: T, arttribute: K) {
    return obj[arttribute]
}
```

###### keyof
keyof 作为一个类型操作符，可以获取一个类型的所有键的类型（字符串字面量或数字字面量），构成一个联合类型

```typescript
interface Point = { 
    x: number, 
    y: number 
}
type pointStr = keyof Point // "x" | "y"
type Arrayish = { [n: number]: unknown } 
type ArrayAttr = keyof Arrayish // number
// 类型约束
function getProperty<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}
// 与其他操作符使用
const person = { name: "Alice", age: 25 };
type PersonKeys = keyof typeof person; // "name" | "age"
```

###### typeof 操作符
JavaScript 上存在 typeof 操作符 [typeof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)  
但TypeScript中的typeof的用途是：获取一个变量或属性的类型。  
而JavaScript中的typeof的用途是：获取一个对象或变量在其运行时的类型信息。

注意：在标识符（即变量名）或其属性上使用 typeof 是唯一合法的。

```typescript
let s1 = "hello"
let s2: typeof s1 = 'world!'
type Predicate = (x: unknown) => boolean;
type K = ReturnType<Predicate>;
const result1: K = false
function f() {
  return { x: 10, y: 3 }
}
type F = ReturnType<typeof f> // type F = { x: number, y: number }
```

###### 索引访问类型
通过索引访问一个对象或数组类型的属性或元素。  
当你有一个对象或数组的索引，并且需要知道这个索引对应的具体类型时，可以使用索引访问类型。

注意：

1. 索引访问类型必须访问已知的属性键，否则会导致编译错误
2. 当使用索引访问类型来获取数组元素的类型时，通常使用 number 作为索引，因为数组索引通常是数字

```typescript
type Person = { age: number; name: string; alive: boolean }
type Age = Person['age'] // number
type I1 = Person['age' | 'name'] // number | string
type I2 = Person[keyof Person] // number | string | boolean
type I3 = Person['alive' | 'name'] // boolean | string
const MyArray = [
  {name: "Alice", age: 15},
  {name: "Bob", age: 23},
  {name: "Eve", age: 38},
]
type PersonInfo = typeof MyArray[number] // type PersonInfo = { name: string, age: number }
type Age1 = typeof MyArray[number]['age'] // type Age1 = number
```

###### 条件类型
**条件类型**允许我们基于某些条件表达式来定义类型。这种类型可以让我们在类型系统中实现逻辑判断，从而创建更加灵活和强大的类型别名。条件类型的语法类似于 JavaScript 中的条件（三元）运算符。  
语法格式：`T extends U ? X : Y`

```plain
type IsNumber<T> = T extends number ? true ： false;
interface Animal {
    live(): void
}
interface Dog extends Animal {
    woof(): void
}
type DogT = Dog extends Animal ? number : string;
type Example = RegExp extends Animal ? number : string;
interface IdLabel {
    id: number
}
interface NameLabel {
    name: string
}
type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;
```

+ 条件类型约束顾名思义，就是用条件类型来约束泛型参数。

```plain
function getLength<T>(arg: T): T extends { length: number } ? number : never {
    return arg.length
}
// 使用示例
getLength('hello');
getLength(42);
type MessageOfOne<T extends { message: unknown }> = T['message']
interface Email {
    message: string;
}
type EmailMessageContents = MessageOfOne<Email>
```

+ 条件类型推断使用 infer 关键字从我们在 true 分支中比较的类型进行推断的方法。

```plain
// 我们可以推断出 Flatten 中的元素类型，而不是使用索引访问类型从 “manually” 中获取它
type Flatten<Type> = Type extends Array<inter Item> ? Item : Type;
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
```

+ 分布式条件类型当条件类型作用于泛型类型时，它们在给定联合类型时变得可分配。

```plain
type ToArray<Type> = Type extends any ? Type[] : never
type StrArrOrNumArr = ToArray<string | number>
// 如果想要避免这种分布式条件类型的行为，可以在 extends 关键字的左右两侧括起来
type ToArrayNonDist<T> = [T] extends [any] ? T[] : never;
type ArrOfStrOrNum = ToArrayNonDist<string | number> // (string | number)[]
```

###### 映射类型
映射类型建立在[索引签名](https://ts.nodejs.cn/docs/handbook/2/objects.html#%E7%B4%A2%E5%BC%95%E7%AD%BE%E5%90%8D)的语法之上，用于声明未提前声明的属性类型。

```plain
type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
}
type Features = {
    darkMode: () => void,
    newUserProfile: () => void
}
type FeatureOptions = OptionsFlags<Features> // type FeatureOptions = { darkMode: boolean, newUserProfile: boolean }
```

+ 映射修饰符映射期间可以应用两个额外的修饰符：`readonly` 和 `?` 分别影响可变性和可选性。你可以通过添加前缀 - 或 + 来移除或添加这些修饰符。如果你不添加前缀，则假定为 +。

```plain
type createMutable<Type> = {
  -readonly [Property in keyof Type]: Type[Property]
}
type Concrete<Type> = {
  [Property in keyof Type]-?: Type[Property]
}

type LockedAccount = {
  readonly id: string
}
type UnlockedAccount = createMutable<LockedAccount> // { id: string }
type MaybeUser = {
  id: string,
  name?: string,
  age?: string
}
type User = Concrete<MaybeUser> // { id: string, name: string, age: string }
```

+ 通过 `as` 重新映射键在 TypeScript > 4.1 版本后，可以使用映射类型中的 `as` 子句重新映射映射类型中的键。

```plain
type Getters<Type> = {
  [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
}
interface Person1 {
  name: string,
  age: number,
  location: string,
}
type LazyPerson = Getters<Person1> // { getName: () => Person1['name'], getAge: () => Person1['age'], getLocation: () => Person1['location'] }
type RemoveKindField<Type> = {
  [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
}
interface Circle {
  kind: 'circle',
  radius: number
}
type KindLessCircle = RemoveKindField<Circle> // => { radius: number }
// 你可以映射任意联合，不仅是 string | number | symbol 的联合，还可以映射任何类型的联合
type EventConfig<Event extends { kind: string }> = {
  [E in Event as E['kind']]: (event: E) => void
}
type SquareEvent = { kind: 'square', x: number, y: number }
type CircleEvent = { kind: 'circle', radius: number }
type Config = EventConfig<SquareEvent | CircleEvent> // => { square: (event: SquareEvent) => void, circle: (event: CircleEvent) => void }
type ExtractPII<Type> = {
  [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false
}
type DBFields = {
  id: { format: "incrementing" },
  name: { type: string, pii: true }
}
type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields> // => { id: false, name: true }
```

###### 模板字面量类型
建立在字符串字面量上，并且能够通过联合扩展成许多字符串，它们具有与 JavaScript 中的模板字面字符串 相同的语法，但用于类型位置。

```plain
type World = 'world'
type Greeting = `hello ${World}` // hello world
type EmailLocaleIDs = 'welcome_email' | 'email_heading'
type FooterLocaleIDs = 'footer_title' | 'footer_sendoff'
type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id` // "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"
type Lang = 'en' | 'ja' | 'pt'
type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}` // "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
```

---

## 函数和类
#### 函数扩展
+ **函数参数**

```typescript
// 1. 参数不能多传，也不能少传 必须按照约定的类型来
// 2. 函数可选参数?
// 3. 函数参数的默认值
function fn(name: string, age:number, teachAge?: number, isMale: boolean = true，callback: Function): string {
    callback()
    return name + age
}
// 剩余参数
function foo(...args: any[]): string {
    return args.join("")
}
const a = [2, "babana", 32, "kebi"]
console.log(foo(...a))
// 参数解构
function getMaxValue({ value1, value2, value3 }: { value1: number, value2: number, value3: number}): number {
    return Math.max(value1, value2, value3)
}
// 使用箭头函数
const getTotal: (...params: number[]) => number = (...params) => {
    return params.reduce((x, y) => x + y, params[0]);
}
const getTotal2 = (...params:  number[]): number => {
    return params.reduce((x, y) => x + y, params[0]);
}
```

+ **接口定义函数**

```typescript
// 定义参数 num 和 num2  ：后面定义返回值的类型
// 只能用于箭头函数上面
interface Add {
    (num:  number, num2: number): number
}
const fn: Add = (num: number, num2: number): number => {
    return num + num2
}
fn(5, 5)
// 定义函数参数和返回值
interface User{
    name: string;
    age: number;
}
function getUserInfo(user: User): User {
  return user
}
```

+ **函数重载**重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。  
可以通过编写**重载签名**来指定一个可以以不同方式调用的函数，然后通过编写**函数主体**来实现签名  
**实现签名还必须与重载签名兼容**。但如果TypeScript没有检测出来，将不会报错...

```typescript
interface FnType {
    [propname: string]: any
}
// 重载签名
function fn(obj: FnType, ...attr: string[]): void
function fn(...params: [string, number, boolean]): void
// 函数主体来实现签名
function fn(...params: any[]): void {
    if(typeof params[0] === "string") {
        console.log("name:", params[0], "age:", params[1], "is male:", params[2])
    } else {
        for(let obj = params[0], i = 1; i < params.length; i++){
            console.log(obj[params[i]]);
        }
    }
}
fn('tom', 24, true)
fn({ name: 'mary', 'age': 32}, 'name', 'age')
```

+ **使用this**  
TODO

#### 类
> 关键字：[class](https://web.nodejs.cn/en-us/docs/web/javascript/reference/classes/)  
ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的“类”改写，就是下面这样。
>

```plain
// 在TypeScript是不允许直接在constructor 定义变量的 需要在constructor上面先声明
class Person {
    name: string;
    age: number
    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    run() {
        console.log(this.name, this.age)
    }
}
// 可以简写 public 是默认修饰符
class Person1 {
    constructor(public name: string, public age: number) {}
    run() {
        console.log(this.name, this.age)
    }
}
```

##### 类的修饰符
+ public 公共  
可以让你定义的变量 内部访问（继承的子类也能访问） 也可以外部访问 如果不写默认就是public

```typescript
class Person {
    constructor(public name: string, public age: number) {}
    log() {
        console.log(this.name, this.age)
    }
}
const tom = new Person('Tom', 23)
console.log(tom.log()) // 内部访问
console.log(tom.name, tom.age) // 外部访问
```

+ private 私有  
代表定义的变量私有的只能在内部访问 不能在外部访问

```typescript
class Person {
    constructor(public name: string, public age: number, private looks: string) {}
    log() {
        console.log(this.name, this.age)
    }
    logPrivateLooks() {
        console.log(this.looks)
    }
}
const tom = new Person('Tom', 23, "good")
console.log(tom.logPrivateLooks()) // 内部访问
console.log(tom.looks) // 属性“looks”为私有属性，只能在类“Person1”中访问。ts(2341)
```

+ protected 保护  
代表定义的变量私有的只能在内部和继承的子类中访问 不能在外部访问

```typescript
class Person {
    constructor(public school: string, protected name: string, protected age: number, private looks: string) {}
    log() {
        console.log(this.name, this.age)
    }
    logSchool() {
        console.log(this.school)
    }
    logPrivateLooks() {
        console.log(this.looks)
    }
}

class Teacher extends Person {
    constructor(school: string, name: string, age: number, looks: string, public teachAge: number) {
        super(school, name, age, looks)
    }
    log() {
        super.log()
    }
    logSchool() {
        super.logSchool()
    }
    logLooks() {
      console.log(this.looks)
    }
}
const tom = new Teacher('xx中学', 'Tom', 23, 'good', 1)
tom.log() // 在继承的子类中访问父类的 protected 属性
tom.logSchool() // 在继承的子类中访问父类的 public 属性
tom.logLooks() //  在继承的子类中访问父类的 private 属性
```

##### 类继承
> implements 从句  
通过使用 implements 子句来检查一个类是否满足特定的 interface。如果一个类未能正确实现它，则会触发错误
>

```typescript
// 使用
interface Pingable {
  ping(): void;
}
class Socket implements Pingable {
  ping () {
    console.log("ping!")
  }
}
// 通过 implements 子句检查多个接口
interface Depthable {
  depth: number
}
class Sonar implements Pingable, Depthable {
  depth: number
  constructor(depth: number) {
    this.depth = depth
  }
  ping() {
    console.log("ping!")
  }
}
// implements 子句检查类是否满足于特定的接口，但不会改变类的类型或其方法
interface Userable {
  name: string,
  check(): void,
}
class UserChecker implements Userable {
  static checkName: RegExp = /^[A-Za-z0-9]{8,12}$/
  name: string
  constructor(name: string){
    this.name = name
  }
  check() {
    return UserChecker.checkName.test(this.name)
  }
}
```



##### extends
> 关键字介绍：[extends](https://web.nodejs.cn/en-us/docs/web/javascript/reference/classes/extends/)  
通过extends来创建另一个类的子类
>

```typescript
// 使用
class Person {
    a: number
    constructor(public name: string) {
        this.a = Math.round(Math.random() * 10)
    }
    move() {
        console.log("Moving along!");
    }
}

class Eat extends Person {
    constructor(public name: string, private readonly food: string) {
        super(name)
    }
    dirnk(times: number) {
        for (let i = 0; i < times; i++) {
            console.log(`drink ${this.food}`);
        }
    }
}

const tom = new Eat("tom", "water")
tom.move()
tom.dirnk(3)
console.log(tom)
// 覆盖方法, 需要遵守契约
class Errors {
    print(message: string): void {
        console.log(message)
    }
}
class syntaxError extends Errors {
    print(message: string, type?: string): void | never {
        if(!type) {
            super.print(message)
        } else {
            console.log(`Syntax Error, type: ${type}, info: ${message}`)
        }
    }
}
// 子类通过declare可以声明更准确的类型，仅当 target >= ES2022` 或useDefineForClassFields为 true 时
interface Animal {
  dateOfBirth: any;
}
interface Dog extends Animal {
  breed: any;
}
class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}
class DogHouse extends AnimalHouse {
  // Does not emit JavaScript code,
  // only ensures the types are correct
  declare resident: Dog;
  constructor(dog: Dog) {
    super(dog);
  }
}
const a = new DogHouse({ dateOfBirth: "2020", breed: "中华田园犬" })
console.log(a)
```

##### 抽象类
> abstract 所定义的就是抽象类
>

```typescript
// 1. abstract不能用作实例化
// 2. abstract 所定义的方法 只能进行一个描述，不能进行一个实现, 且在派生类中药实现
abstract class B {
  constructor(public name?: string) {}
  getName() {
    return this.name
  }
  abstract init(name: string): void
}
// 派生类
class React extends B {
  constructor() {
    super()
  }
  init(name: string) {}
  setName (name: string) {
    this.name = name
  }
}
const react = new React()
react.setName("guanhai")
console.log(react.getName())
```

---

## 其他
#### 声明文件和命名空间
##### 声明文件
通过 xxx.d.ts 来定义 TypeScript 的声明文件，并且通常伴随着使用 declare 关键字

declare 主要作用：让当前文件可以使用其他文件声明的类型。

> 比如：自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用`declare`关键字，告诉编译器外部函数的类型。
>

declare 关键字特点：

1. 它只是通知编译器某个类型是存在的，不用给出具体实现。
2. declare 只能用来描述已经存在的变量和数据结构，不能用来声明新的变量和数据结构。
3. declare 关键字也可以单独在TypeScript文件中声明，用于表示某个类型是存在的，可以在当前文件使用。
+ `declare variable`declare 关键字可以给出外部变量的类型描述

```typescript
// index.d.ts
declare let x: number;
// other.ts
x = 123; // 正常编译
```

+ `declare function`declare 关键字可以给出外部函数的类型描述，declare 关键字后面不能带有函数的具体实现。

```typescript
// index.d.ts
declare function say(sentence: string): void;
// 可以重载函数的定义
declare function getWidget(n: number): string;
declare function getWidget(s: string): string[];
// other.ts
const sayHello: typeof say = (name) => console.log(`Hello, ${name}!`)
sayHello('Tom')
// 如果是第三方脚本提供了sayHello和getWidget函数，且index.d.ts是有效的，可以直接使用sayHello和getWidget
```

+ `declare class`使用declare class描述类或类类对象。

```typescript
// index.d.ts
declare class Greeter {
    constructor(greeting: string)
    greeting: string;
    showGreeting(): void;
}
declare class CustomError extends Error {
    timestamp: Date;
    name: string;
    constructor(message: string)
    toString():string;
}
// other.ts
// 创建一个符合 Greeter 类型的对象字面量
const tom: Greeter = {
  greeting: 'tom',
  showGreeting: function() {
    console.log(`Hello, ${this.greeting}!`);
  }
};
tom.showGreeting()
const bug1: CustomError = new (class extends Error {
  timestamp: Date;
  constructor(message: string) {
    super();
    this.message = message;
    this.timestamp = new Date(Date.now())
  }
  toString() {
    return `This error is ${this.message}, occurrence time is ${this.timestamp}`
  }
})('syntax error')
console.log(bug1.toString())
//  如果是第三方脚本提供了Greeter和CustomError类，且index.d.ts是有效的，可以直接使用Greeter和CustomError类
```

+ `declare namespace`使用 declare namespace 来描述通过点分表示法访问的类型或值。在 declare namespace 里面加不加export关键字都可以。

```typescript
// index.ts
declare namespace API {
  type Way = 'HTTP' | 'WebSocket' | 'TCP';
  namespace HTTP {
    type Methods = 'Get' | 'Post' | 'Head' | 'Put' | 'Delete' | 'Options' | 'Trace';
    type UrlValidate = (url: string) => boolean;
    interface Response {
      code: '0' | '1';
      data?: Object;
      message: string;
    }
    interface Request {
      (method: Methods, url: string, options?: Object): Promise<Response>;
    }
  }
}
// other.ts
// 定义一个符合UrlValidate类型的函数
const isValidUrl: API.HTTP.UrlValidate = (url: string): boolean => {
  const pattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  return pattern.test(url);
};
// 使用API.HTTP命名空间中的类型和接口
async function exampleUsage() {
  const url: string = "https://example.com/api/data";
  // 验证URL是否有效
  if (!isValidUrl(url)) {
    console.error('Invalid URL:', url);
    return;
  }
  // 现在可以调用httpRequest函数
  try {
    const response = await httpRequest('Get', url);
    if (response.code === '0') {
      console.log('Data received:', response.data);
    } else {
      console.error('Failed to get data:', response.message);
    }
  } catch (error) {
    console.error('An error occurred during the HTTP request:', error);
  }
}
// 假设的httpRequest函数实现
function httpRequest(method: API.HTTP.Methods, url: string, options?: Object): Promise<API.HTTP.Response> {
  // 这里是httpRequest的实现，实际中应该使用XMLHttpRequest, fetch或其他HTTP客户端库
  // ...
}
// 调用函数
exampleUsage();
```

+ `declare global`（不常用）为 JavaScript 引擎的原生对象添加属性和方法
+ `declare enum`

```typescript
// index.d.ts
declare enum E1 {
    A,
    B,
    C = 7,
    D = 9
}
// const 枚举
declare enum E2 {
    A,
    B = 101,
    C = 'haha'
}
// other.ts
const a: E2.B = 101
```

##### 命名空间
TypeScript中使用命名空间（以前是 “内部模块”）来组织代码的各种方法。使用  namespace 关键字来声明内部模块。

基本使用：

```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
  const lettersRegexp = /^[A-Za-z]+$/;
  const numberRegexp = /^[0-9]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
  export class ZipCodeValidator implements StringValidator {
    isAcceptable(s: string) {
      return s.length === 5 && numberRegexp.test(s);
    }
  }
}
let strings = ["Hello", "98052", "101"];
let validators: { [s: string]: Validation.StringValidator } = {}
validators['ZIP code'] = new Validation.ZipCodeValidator()
validators["Letters only"] = new Validation.LettersOnlyValidator();
for(let s of strings) {
  for(let name in validators) {
    console.log(`validators ${name}: ${s} is ${validators[name].isAcceptable(s)}`)
  }
}
```

1. 嵌套命名空间可以嵌套

```typescript
namespace Test {
    export let abc = 'abc'
    export const add = (a: number, b: number) => a+b
    export namespace Fn{
        export function foo(){
            console.log("foo!")
        }
    }
}
```

2. 抽离用文件来抽离命名空间

```typescript
// parent.ts
export namespace V {
    export const a = 1
}
// child.ts
import { V } from "./parent.ts"
console.log(V.a)
```

3. 使用别名来简化命名使用 import q = x.y.z 为常用对象创建较短的名称

```typescript
namespace A {
    namespace B {
        namespace C {
            export function foo() {
                console.log('foo!')
            }
        }
    }
}
import foo = A.B.C.foo
```

4. 合并重名的命名空间会合并，不管是同一个文件还是跨文件（需要引入跨文件）

```typescript
namespace Validation {
  export interface StringValidator {
    isAcceptable(s: string): boolean;
  }
}
// 重名的命名空间会合并
namespace Validation {
  const lettersRegexp = /^[A-Za-z]+$/;
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string) {
      return lettersRegexp.test(s);
    }
  }
}
```

#### 型变
参考视频：[超细致讲解TypeScript中的型变：协变、逆变、双向协变、不变](https://www.bilibili.com/video/BV1HY4111764/?spm_id_from=333.337.search-card.all.click&vd_source=1c6268f99220acd2592c93a3a87cbe31)

参考文档：[TypeScript 的协变、逆变、双向协变、不变](https://hiyangguo.com/typescript-variant/)

**型变：**

TypeScript相对JavaScript，保证了类型安全，也就是变量只能赋予同类型的值，对象只能访问它自有的属性或者方法。

```typescript
let b:boolean = true
let a:number = 0
a = b // 不能将类型"boolean"的值赋给类型"number"的值
```

但类型安全也并不是太死板，我们这里提到的"**型变**"，是<u>类型变通</u>的意思，在型变这个概念规则下中不同类型的值是能够赋值的，包含了：**协变**、**逆变**和**双向协变**，也就是下面要介绍的概念。

##### 协变
子类赋值给父类的过程，就是"**协变**"

```typescript
interface Person {
    name: string
}
interface Student extends Person {
    age: number
}
let variableP: Person = { name: 'tim' }
let variableS: Student = { name: 'kobe', age: 16 }
variableP = variableS
```

##### 逆变
在TypeScript中，函数的参数是**逆变**的，在这种情况下父类型参数可以赋给子类型参数。因为父类索引更少，子类索引更多，下面是一个例子：

```typescript
interface Person {
    name: string
}
interface Student extends Person {
    age: number
}
type FunP = (arg: Person) => any;
type FunS = (arg: Student) => any;
let funp: FunP = ({ name }) => ({ name });
let funs: FunS = ({ name, age }) => name.length > age ? true : false;
funs = funp
```

但函数的返回值是**协变**的，所以可以这么写：

```typescript
interface Person {
    name: string
}
interface Student extends Person {
    age: number
}
type FunP_v = (arg: Person) => Student
type FunS_v = (arg: Student) => Person
let funp_v: FunP_v = ({ name }) => ({name, age: Math.floor(Math.random() * 10) })
let funs_v: FunS_v = ({ name, age }) => ({ name })

funs_v = funp_v
```

##### 双向协变
父类型参数的函数可以赋值给子类型的函数，子类型参数的函数可以赋值给父类型的函数，这种特性成为"**双向协变**"

> 在`typescript 2.x`之后需要将 `tsconfig.json` 中的 `strictFunctionTypes` 设置为 false，则支持双向协变。
>

```typescript
namespace BidirectionalCovariance {
  export class Animal {
    speak() {
      console.log('animal sound')
    }
  } 
  export class Dog extends Animal {
    speak() {
      console.log('Wang Wang Wang!')
    }
    get type() {
      return '德国牧羊犬'
    }
  }
  export type AnimalHandler = (args: Animal) => any
  export type DogHandler = (args: Dog) => any
}
// example1:
let _handleAnimal: BidirectionalCovariance.AnimalHandler = (args: BidirectionalCovariance.Animal) => {
  args.speak()
}
let _handleDog: BidirectionalCovariance.DogHandler = (args: BidirectionalCovariance.Dog) => {
  return args.type
}
// tsconfig.json 中 "strictFunctionTypes": false 时，开启双向协变，但是推荐别这么做
_handleAnimal = _handleDog
_handleDog = _handleAnimal
```

#### 工具类型
TypeScript 提供了一些内置的类型工具，用来方便地处理各种类型，以及生成新的类型。TypeScript 内置了 17 个类型工具，可以直接使用。

+ Awaited此类型旨在对 async 函数中的 await 或 Promise 中的 .then() 方法等操作进行建模 - 具体来说，他们递归地解开 Promise 的方式。

```typescript
type A = Awaited<Promise<string>> // string
type B = Awaited<Promise<Promise<number>>> // number
type C = Awaited<boolean | Promise<number>> // boolean | number
```

+ Partial构造一个将 Type 的所有属性设置为可选的类型。此工具将返回一个表示给定类型的所有子集的类型。

```typescript
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
```

+ RequiredRequired返回一个新类型，将参数类型Type的所有属性变为必选属性。它与Partial的作用正好相反。

```typescript
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
```

+ Readonly构造一个将 Type 的所有属性设置为 readonly 的类型，这意味着构造类型的属性不能重新分配。

```typescript
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
```

+ Record<Keys, Type>构造一个对象类型，其属性键为 Keys，其属性值为 Type。此工具可用于将一种类型的属性映射到另一种类型。

```typescript
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
```

+ Pick<Type, Keys>通过从 Type 中选取一组属性 Keys（字符串字面或字符串字面的并集）来构造一个类型。

```typescript
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
```

+ Omit<Type, Keys>通过从 Type 中选择所有属性然后删除 Keys（**字符串字面量或字符串字面量的并集**）来构造一个类型。与 Pick 相反。

```typescript
// 这里的 Vegetable 是上面代码中的
type VegetableGrow = Omit<Vegetable, 'price' | 'picture' | 'introduce'>
const potato: VegetableGrow = {
  maturityTime: '3 months',
  placeOfOrigin: '爱达荷州',
  growthCircle: '春到夏'
}
```

+ Exclude<UnionType, ExcludedMembers>通过从 UnionType 中排除所有可**分配**给 ExcludedMembers 的联合成员来构造一个类型。

```typescript
type Shape = { kind: 'circle', radius: number } | { kind: 'square', sideLen: number } | { kind: 'triangle', sideLen: { x1: number, x2: number, x3: number } }
type Constant = '圆周率pi' | '自然对数的底e' | '黄金分割比φ' | '欧拉-马斯刻若尼常数γ' | '阿贝尔常数G'
type T1 = Exclude<Shape, { kind: 'circle' }>
type M1 = Exclude<Constant, '圆周率pi'>

const t1b2: T1 = {
  kind: 'square',
  sideLen: 5
}
const m1b1: M1 = '自然对数的底e'
```

+ Extract<Type, Union>通过从 Type 中提取所有可**分配**给 Union 的联合成员来构造一个类型。

```typescript
// 这里的 Shape 是上面代码中的
type T2 = Extract<Shape, { kind: 'circle' }>
type M2 = { [K in Extract<Constant, '黄金分割比φ'>]: number }
const circle1: T2 = {
  kind: 'circle',
  radius: 11
}
const constant1: M2 = {
  '黄金分割比φ': 1.61803
}
```

+ NonNullable通过从 Type 中排除 null 和 undefined 来构造一个类型。

```typescript
type Data = string[] | string | null | undefined
type IsData = NonNullable<Data>
const data1 = ['1', '2', '3']
```

+ Parameters从函数类型 Type 的参数中使用的类型构造元组类型。

```typescript
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
```

+ ConstructorParameters从构造函数类型的类型构造元组或数组类型。它生成一个包含所有参数类型的元组类型（如果 Type 不是函数，则生成类型 never）。

```typescript
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
```

+ ReturnType构造一个由函数 Type 的返回类型组成的类型。

```typescript
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
```

+ InstanceTypeInstanceType 构造一个由 Type 中的构造函数的实例类型组成的类型。 Type 代表任意构造函数。

```typescript
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
```

+ NoInferNoInfer 阻止对所包含类型的推断。除了阻止推断之外，NoInfer 与 Type 相同。 当你使用 NoInfer 时，你告诉 TypeScript 不要在泛型位置上推断出一个更宽泛的类型。 这在某些情况下非常有用，尤其是当你不希望泛型参数被推断为联合类型或其他更宽泛的类型时。

```typescript
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
```

+ ThisParameterTypeThisParameterType 提取函数类型的 this 参数的类型，如果函数类型没有 this 参数，则提取 unknown。

```plain
function toHex(this: number) {
  return this.toString(16)
}

function numberToString(n: ThisParameterType<typeof toHex>) {
  return toHex.apply(n)
}
```

+ OmitThisParameterOmitThisParameter 从 Type 中删除 this 参数。如果 Type 没有显式声明的 this 参数，则结果只是 Type。 否则，将从 Type 创建一个没有 this 参数的新函数类型。 泛型被删除，只有最后一个重载签名被传播到新的函数类型中。

```typescript
// // 这里的 toHex 是上面代码中的
const fiveToHex: OmitThisParameter<typeof toHex> = toHex.bind(5);
console.log(fiveToHex());
```

+ ThisTypeThisType 此工具不返回转换后的类型。相反，它用作上下文 this 类型的标记。

```typescript
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
```

+ 内在字符串操作类型Uppercase 将字符串中的每个字符转换为大写版本。Lowercase将字符串中的每个字符转换为等效的小写字母。Capitalize将字符串中的第一个字符转换为等效的大写字母。Uncapitalize将字符串中的第一个字符转换为等效的小写字母。这几个相对简单且不常用，示例请查看：[内在字符串操作类型](https://ts.nodejs.cn/docs/handbook/2/template-literal-types.html#%E5%86%85%E5%9C%A8%E5%AD%97%E7%AC%A6%E4%B8%B2%E6%93%8D%E4%BD%9C%E7%B1%BB%E5%9E%8B)

#### 混入
#### 迭代器和生成器
#### 装饰器
装饰器是实验特性，主要是为了某些需要附加功能来支持注释或修改类和类成员的场景，它提供一种为类声明和成员添加注释和元编程的语法的方法。

本次介绍使用的是装饰器的传统语法，TypeScript5.0 开始支持装饰器的标准语法

文档：[Typescript 5.0 中的装饰器](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/#decorators)

中文翻译文档：[阮一峰 TypeScript 教程 - Typescript 5.0 中的装饰器](https://typescript.p6p.net/typescript-tutorial/decorator.html)

**启用需要**：项目根目录的 tsconfig.json 启用 experimentalDecorators 为 true

**使用方式**：@expression 形式，其中 expression 必须评估为一个函数，该函数将在运行时调用，并带有有关装饰声明的信息。

##### 装饰器工厂
"装饰器工厂"是一个返回装饰器函数的工厂函数。通过使用装饰器工厂，你可以创建可配置的装饰器，它们允许你在装饰器执行之前传递参数。

```typescript
function decoratorFactory() {
 /**
   * 1. target 是类的构造函数
   *    对于方法、访问器、属性、参数装饰器：target 是类的原型（prototype），如果装饰的是静态成员，则是类的构造函数。
   *    target 表示被装饰的类或者类的实例。通过 target，你可以访问或修改类的元数据（如类的属性、方法等）。
   * 2. propertyKey 参数
   *    propertyKey 是一个字符串或符号类型
   *    propertyKey 表示被装饰的属性或方法的名称。
   *    在方法、访问器、属性和参数装饰器中，propertyKey 用于标识当前正在装饰的成员。
   * 3. descriptor 参数 -- 方法装饰器和访问器装饰器特有
   *    类型：descriptor 是 PropertyDescriptor 类型，它是一个 JavaScript 对象，用于描述对象属性的特性。
   *    作用：
   *    descriptor 用于描述类的某个成员的属性（如可配置性、可枚举性、可写性等），并允许修改这些属性。
   *    通过修改 descriptor，可以改变属性或方法的行为。例如，可以通过修改 descriptor.value 来替换方法实现，或者通过修改 descriptor.get 和 descriptor.set 来改变访问器的行为。
   *    PropertyDescriptor 属性：
   *      value: 该属性或方法的当前值。
   *      writable: 指定属性是否可以被赋值运算符修改。
   *      configurable: 指定是否可以删除属性或修改属性特性。
   *      enumerable: 指定属性是否可以在 for...in 循环或 Object.keys() 中枚举。
   *      get: 一个返回属性值的 getter 函数。
   *      set: 一个用来修改属性值的 setter 函数。
   */
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    // processing logic
  }
}
```

##### 装饰器组成
可以将多个装饰器应用于声明，例如：

```typescript
@f @g @x

@f
@g
@x
```

当多个装饰器应用于单个声明时，类似与数学中的组合函数，如：应用f和g时，等效于f(g(x))，所以规律：

1. 每个装饰器的表达式都是从上到下计算的。
2. 然后将结果作为函数从下到上调用。

```plain
function first() {
  console.log("first log")
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    console.log("first result")
  }
}
function second() {
  console.log("second log")
  return function (target: any, propertyKey?: string, descriptor?: PropertyDescriptor) {
    console.log("second result")
  }
}
class Example {
  @first()
  @second()
  test(){}
}
const example = new Example()
// 测试下打印顺序
example.test()
```

##### 类装饰器
类装饰器是在类声明之前声明的，应用于类的构造函数，可用于观察、修改或者替换类定义。

```typescript
type colorType = "red" | "green" | "grey" | "yellow";

interface FruitAttrs {
  color: colorType;
  createTime: Date;
}

function isFresh<T extends { new(...args: any[]): {} }>(constructor: T) {
  const now = Date.now();
  function getHours(timestamp: number) {
    return timestamp / 1000 / 60 / 60
  }
  return class extends constructor {
    timeDiff: number
    constructor(...args: any[]) {
      super(...args);
      this.timeDiff = Math.ceil(getHours(now - (this as any).createTime.getTime()))
      if(this.timeDiff > 24) {
        console.log('no fresh')
      } else {
        console.log(`is fresh, time: ${this.timeDiff} hours`)
      }
    }
  };
}

function source<T extends new (...args: any[]) => {}>(constructor: T){
  return class extends constructor {
    source: string
    constructor(...args: any[]) {
      super(...args);
      this.source = '漳州天宝'
    }
  }
}

@isFresh
@source
class Fruit {
  name: string;
  color: colorType;
  createTime: Date;
  
  constructor(name: string, attrs: FriutAttrs) {
    this.name = name;
    this.color = attrs.color;
    this.createTime = attrs.createTime;
  }
}

const banana = new Fruit('banana', { color: 'yellow', createTime: new Date(Date.UTC(2024, 7, 23, 8, 5, 55)) });
console.log((banana as any).source)
```

##### 方法装饰器
方法装饰器在方法声明之前声明。装饰器应用于方法的属性描述符，可用于观察、修改或替换方法定义。

方法装饰器的表达式将在运行时作为函数调用，并带有以下三个参数：

1. 静态成员的类的构造函数，或者实例成员的类的原型。
2. 成员的名称。
3. 成员的属性描述符。

```typescript
class Getter {
  greeting: string;
  constructor(message: string) {
    this.greeting = message
  }
  @enumerable(false)
  greet(){
    return "Hello, " + this.greeting
  }
}
// 设置是否可枚举
function enumerable(value: boolean) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.enumerable = value;
    }
}
console.log(Object.keys(Getter.prototype).includes('greet'))
```

##### 访问器装饰器
访问器装饰器在访问器声明之前声明。访问器装饰器应用于访问器的属性描述符，可用于观察、修改或替换访问器的定义。

访问器装饰器的表达式将在运行时作为函数调用，并带有以下三个参数：

1. 静态成员的类的构造函数，或者实例成员的类的原型。
2. 成员的名称。
3. 成员的属性描述符。

```typescript
class Point {
    private _x: number
    private _y: number
    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }
    @configurable(false)
    get x() {
        return this._x
    }
    @configurable(false)
    get y() {
        return this._y
    }
}
function configurable(value: boolean) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        descriptor.configurable = value
    }
}
```

##### 属性装饰器
属性装饰器是在属性声明之前声明的。

属性装饰器的表达式将在运行时作为函数调用，并带有以下两个参数：

1. 静态成员的类的构造函数，或者实例成员的类的原型。
2. 成员的名称。

下面这个示例使用了元数据：

```plain
import "reflect-metadata";
const formatKey = Symbol('format')
const format = (formatString: string) => Reflect.metadata(formatKey,formatString)
const getFormat = (target: any, propertyKey: string) => Reflect.getMetadata(formatKey, target, propertyKey)
class HotelGreeter {
  // 这里的@format("Hello, %s") 装饰器是一个 装饰器工厂，调用 @format("Hello, %s") 时，它会使用 reflect-metadata 库中的 Reflect.metadata 函数为属性添加一个元数据条目。
  @format("Good morning, %s")
  greeting: string;
  constructor(customer: string) {
    this.greeting = customer
  }
  greet() {
    // 调用 getFormat 时，它会读取格式的元数据值。
    let formatString = getFormat(this, "greeting")
    return formatString.replace('%s', this.greeting)
  }
}
const bob = new HotelGreeter("Tom")
console.log(bob.greet())
```

##### 参数装饰器
参数装饰器在参数声明之前声明。参数装饰器应用于类构造函数或方法声明的函数。

参数装饰器的表达式将在运行时作为函数调用，并带有以下三个参数：

1. 静态成员的类的构造函数，或者实例成员的类的原型。
2. 成员的名称。
3. 函数参数列表中参数的序号索引。

特点：参数装饰器的返回值被忽略。

下面示例使用了元数据：

```typescript
import "reflect-metadata";
const requiredMetadataKey = Symbol('required')
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  let existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyKey) || []
  existingRequiredParameters.push(parameterIndex)
  Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, propertyKey)
}
function validate(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(verbose: boolean, type: string) => string>) {
  let method = descriptor.value!;
  descriptor.value = function(verbose, type){
    let requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName)
    if (requiredParameters) {
      for(let parameterIndex of requiredParameters) {
        if(parameterIndex > arguments.length) {
          throw new Error("Missing required argument.")
        }
      }
    }
    return method.call(this, verbose, type)
  }
}
class BugReport {
  type = "report";
  title: string;
  
  constructor(t: string) {
    this.title = t;
  }
}
class BugLog extends BugReport {
  constructor(t: string) {
    super(t)
  }
  @validate
  print(@required verbose: boolean,@required type: string = 'report'){
    this.type = type
    if(verbose) {
      return `type: ${this.type}\ntitle: ${this.title}`
    } else {
      return this.type
    }
  }
}
// 上面装饰器的作用和没用装饰器时几乎没什么区别，因为TypeScript有类型推论（这是TypeScript的官方文档的示例）
const bug2 = new BugLog('a is undefined')
const bug3 = new BugLog('语法错误')
console.log(bug2.print(true, 'definition error'))
bug3.print(true, 'grammar')
// 这里举一个真实的案例
function logParam(target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`Decorating parameter at index ${parameterIndex} of method '${String(propertyKey)}' in object ${target.constructor.name}`);
  const existingParamIndexs = Reflect.getOwnMetadata('logParam:index', target, propertyKey) || []
  existingParamIndexs.push(parameterIndex)
  Reflect.defineMetadata('logParam:index', existingParamIndexs, target, propertyKey)
}
function logMethod(target: any, propertyName: string, descriptor: TypedPropertyDescriptor<(username: string, age: number) => void>) {
  const originMethod = descriptor.value!;
  descriptor.value = function(...args) {
    const paramIndexs = Reflect.getOwnMetadata('logParam:index', target, propertyName)
    if(paramIndexs) {
      for(const index of paramIndexs) {
        console.log(`Value of parameter at index ${index}:${args[index]}`)
      }
    }
    return originMethod.call(this, ...args)
  }
  return descriptor
}
class UserService {
  // 使用方法装饰器和参数装饰器
  @logMethod
  addUser(@logParam username: string, @logParam age: number) {
    // 添加用户逻辑...
    console.log(`Adding user ${username} with age${age}`);
  }
}
const userService = new UserService();
userService.addUser('Alice', 30); // 这将记录参数 'Alice' 和 30 的值
```

##### 元数据
TypeScript 包括为具有装饰器的声明触发某些类型的元数据的实验性支持。

需要 tsconfig.json 中设置 emitDecoratorMetadata 编译器选项为 true。

可以通过 npm 安装这个[实验性元数据 API](https://github.com/rbuckton/ReflectDecorators) 添加 polyfill 的 reflect-metadata 库:

```bash
npm i reflect-metadata --save
```

#### tscofing.json配置项
下面是我对tsconfig.json进行了一次总结和分类，更多配置请参考TypeScript的tsconfig参考文档（中文）：[https://ts.nodejs.cn/tsconfig/](https://ts.nodejs.cn/tsconfig/)

```json
{
  "compilerOptions": {
    // * 编译目标配置
    // 编译语言的版本
    "target": "ESNext",
    // 生成代码的模板标准
    "module": "ESNext",
    // TS 需要引入的库，即声明文件，es5默认引用了dom、es5、scripthost,如需要使用es的高级版本特性，通常需要配置，如es8的数组新特性需要引入"ES2019.Array"
    "lib": [
      "DOM",
      "ES2015",
      "ScriptHost",
      "ES2019.Array",
    ],

    // * 其他编译配置
    // TS编译器在第一次编译之后会生成一个存储编译信息的文件，第二次编译会在第一次的基础上进行增量编译，可以提高编译的速度
    "incremental":false,
    // 增量编译文件的存储位置
    "tsBuildInfoFile": "./ts-build",
    // 允许编译器编译JS，JSX文件
    "allowJs":false,
    // 控制 JSX 的编译模式, 如：preserve，则保留 JSX 语法不转换，生成 .jsx 或 .tsx 文件等等
    "jsx": "preserve",
    // 指定 JSX 的生成函数，如：h，则使用 h 作为创建函数
    "jsxFactory": "React.createElement",
    // 用于控制迭代行为兼容性的编译选项。它的作用是在将代码编译到较旧的 JavaScript 版本（如 ES5/ES3）时，更精确地模拟现代 JavaScript（ES6+）的迭代协议。
    "downlevelIteration": true,
    // 控制 TypeScript 如何确定文件是否为 脚本或模块。 "auto"（默认）、"legacy"（import 和 export 语句来确定文件是否为模块）、"force"（确保每个非声明文件都被视为模块）。
    "moduleDetection": "force",

    // * 严格类型检查
    // 开启所有严格模式的类型检查
    "strict": true,
    // 不允许把null、undefined赋值给其他类型的变量
    "strictNullChecks": true,
    /**
     * 当strictFunctionTypes启用时，TypeScript会对函数参数类型进行更严格的逆变检查。
     * 当strictFunctionTypes禁用时，TypeScript采用双变（Bivariant）检查，即逆变和协变都被认为是可接受的。
     */
    "strictFunctionTypes": false,
    // 类的实例属性必须初始化
    "strictPropertyInitialization": true,
    // 严格的bind/call/apply检查
    "strictBindCallApply": true,
    // 不允许隐式的any类型
    "noImplicitAny": false,
    // 不允许this有隐式的any类型
    "noImplicitThis": true,
    // 检查只声明、未使用的局部变量(只提示不报错)
    "noUnusedLocals": false,
    // 检查未使用的函数参数(只提示不报错)
    "noUnusedParameters": false,
    // 防止switch语句贯穿(即如果没有break语句后面不会执行)
    "noFallthroughCasesInSwitch": true,
    // 在代码中注入'use strict'
    "alwaysStrict": true,
    // 是否检测JavaScript语法
    "checkJs": false,

    // * 路径与模块解析
    // 解析非相对模块的基地址，默认是当前目录
    "baseUrl": "./",
    // 路径映射，相对于baseUrl
    "paths": {
      // 如使用jquery时不想使用默认版本，需要手动指定版本，可进行如下配置
      "@jquery": [
        "node_modules/jquery/dist/jquery.min.js"
      ],
      "@/*": [
        "./src"
      ],
      "namespace/*": [
        "./namespace"
      ]
    },
    // 用于 虚拟合并多个目录 的配置选项，主要解决模块路径解析的问题。它允许 TypeScript 编译器将多个物理目录视为一个逻辑上的根目录，从而简化模块导入路径和类型检查。
    "rootDirs": ["./src", "./types", "./namespace"],
    // 模块解析策略，ts默认用node的解析策略，即相对的方式导入
    "moduleResolution": "node",
    // 允许导入JSON
    "resolveJsonModule": true,

    // * 输入与输出控制
    // 指定输入文件目录(用于输入)，用于控制输出目录结构
    "rootDir": "./src",
    // 指定输出目录
    "outDir":"./dist",
    // 删除注释
    "removeComments": true,
    // 不输出文件，即编译后不会产生任何的JavaScript文件
    "noEmit": false,
    // 打印诊断信息
    "diagnostics":true,
    // 生成.d.ts文件，开启后会自动生成声明文件
    "declaration": false,
    // 声明文件存放目录，显式指定时，需要将 declaration 置为true
    // "declarationDir": "./types",
    // 只生成声明文件，而不会生成js文件
    "emitDeclarationOnly": false,
    // 生成目标文件的sourceMap文件
    "sourceMap": false,
    // 生成目标文件的inline SourceMap，inline SourceMap会包含在生成的js文件中
    "inlineSourceMap": false,
    // 为声明文件生成sourceMap
    "declarationMap": false,
    // 打印输出文件
    "listEmittedFiles": true,
    // 打印编译后的文件
    "listFiles": false,

    // * 类型声明文件
    // 声明文件目录，默认时node_modules/@types
    "typeRoots": ["node_modules/@types", "types"],
    // 从 typeRoots 中选择要包含的特定类型包，其他包将被忽略。若设为空数组 []，则 禁用自动加载
    "types": [],

    // * 实验性特性
    // 装饰器的实验特性
    "experimentalDecorators": true,
    // 装饰器的声明触发某些类型的元数据的实验性支持
    "emitDecoratorMetadata": true,
    // 使用现代类字段定义
    "useDefineForClassFields": true,
  },
  // 指定一个匹配列表（属于自动指定该路径下的所有ts相关文件）
  "include": [
    "src/**/*",
    "namespace/*",
    "types/*"
  ],
  // 指定一个排除列表（include的反向操作）
  "exclude": [
    "node_modules"
  ],
  // 指定哪些文件使用该配置（属于手动一个个指定文件）
  // "files": [
  //   "demo.ts"
  // ],
  // 使ts-node可以直接执行node.js脚本
  "ts-node": {
    "compilerOptions": {
      "module": "commonjs"
    }
  }
}
```

#### 编译控制注释
**<font style="color:rgb(64, 64, 64);">编译控制注释</font>**<font style="color:rgb(64, 64, 64);">的作用在于临时绕过类型检查、控制文件的类型检查行为，或在特定场景下管理类型错误。</font>

1. `// @ts-ignore`

<u>它能忽略下一行的类型错误（不触发编译报错）</u>

场景：能够快速的绕过已知但暂时无法修复的问题（但不能滥用）

```typescript
// @ts-ignore
const a: string[] = [{}, "abc", 123]
```

2. `// @ts-expect-error`

<u>明确预期某行代码存在类型错误，若无错误则触发警告</u>

场景：能够临时标记已知问题

```typescript
// @ts-expect-error
const a: number = "25"; // ✅ 实际存在错误，注释生效且无警告

// @ts-expect-error
const b: number = 25; // ❌ TypeScript 警告：未使用的 @ts-expect-error
```

3. `// @ts-nocheck`

<u>在</u>`<u>.js</u>`<u>或</u>`<u>.ts</u>`<u>文件中全局禁用类型检查</u>

场景：临时绕过整个文件的类型检查，比如：遗留代码或者快速调试

```typescript
// @ts-nocheck
const a: string = 100 // 不会触发类型错误
const b: number = "123" // 不会触发类型错误
const c: boolean = {} // 不会触发类型错误
```

#### 三斜线指令
三斜杠指令是包含单个 XML 标记的单行注释，注释的内容用作编译器指令。有且只有在其包含文件的顶部有效，之前只能有注释或者其他的三斜杠指令。

注意：如果指定了编译器标志 `noResolve`，则忽略三斜杠引用。

参考：[三斜线指令](https://doc.cherrychat.org/ts/ts%E6%96%87%E6%A1%A3/%E4%B8%89%E6%96%9C%E7%BA%BF%E6%8C%87%E4%BB%A4.html)

##### 常用
+ ///  

```typescript
// a.d.ts
function foo(msg: string): string
```

```typescript
// b.ts
/// <reference path="a.d.ts" />
function log(fn: Function): void {
  console.log(fn())
}
const foo1: typeof foo = () => 'Hello, world!'
log(foo1)
```

    1. 这个指令用于声明文件依赖项。
    2. 它告诉 TypeScript 编译器在编译过程中应该包含哪些额外的文件。
    3. 这对于组织大型项目中的代码和类型声明很有帮助，尤其是在不同文件之间有很多交互时。
+ /// 

```typescript
/// <reference types="express" />
```

这个指令会告诉TypeScript编译器需要加载名为'express'的npm包里的类型声明

    1. 用作声明对包的依赖, 该文件使用 @types/xxx/index.d.ts 中声明的名称
    2. 这允许用户从 TypeScript 的节点模块解析器中引用声明。
+ /// 

```typescript
/// <reference lib="ES2017.string" />
console.log("foo".padStart(10, "*"))
```

这个指令会告诉TypeScript编译器你的代码需要使用'ES2017.string'库的类型声明，而padStart属于ES2017中的。上面示例代码当然还跟tsconfig.json的target（编译语言的版本）相关。

    1. 这个指令用于包含 TypeScript 库文件的类型声明
    2. TypeScript 提供了如'es2015'、'dom'等许多内置库的类型声明，可以使用这个指令显式包含它们。

##### 不常用
极少用，这里不做展述

+ ///  该指令将文件标记为默认库。你将在 `lib.d.ts` 及其不同变体的顶部看到此注释。
+ ///   
如果你在使用 AMD 模块加载器，这个指令可以用来命名输出的 AMD 模块。

