## 介绍

TypeScript 是一种由微软开发的开源编程语言，是 JavaScript 的超集，支持静态类型检查和最终被编译为纯 JavaScript 执行。它通过类型系统提供更强大的代码编辑、重构、调试和维护能力，适合大型项目和团队协作。

### 参考

**视频**

1. [Dell-TypeScript 系统入门到项目实战](https://www.alipan.com/t/SdVsRD09wSM1VkvOF7CH)
2. [小满TypeScript基础教程全集](https://www.bilibili.com/video/BV1wR4y1377K/?spm_id_from=333.337.search-card.all.click&vd_source=1c6268f99220acd2592c93a3a87cbe31)

p15、p16、p21~36、p21(模块解析)讲的和JavaScript里面是一样的
**文档**

1. [TypeScript 中文网](https://ts.nodejs.cn/)
1. [TypeScript](https://www.typescriptlang.org/)
1. [小满zs的TypeScript的收藏集](https://blog.csdn.net/qq1195566313/category_11559497.html?spm=1001.2014.3001.5515)
1. [阮一峰 TypeScript 教程](https://typescript.p6p.net/)

**训练场**：[TypeScript Playground](https://www.typescriptlang.org/play/)

### 安装

  ```bash
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
## 类型
#### 基础类型

```Typescript
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
* **any 类型**
> any 类型代表任何值，但会失去TypeScript类型检测的作用

* **unknown 类型**
> unknown 类型代表任何值，但使用 unknown 类型的值做任何事情都是不合法的。这类似于 any 类型，但更安全
```TypeScript
function f1(a: any) {
	a.b(); // OK
}
function f2(a: unknown) {
	a.b(); // 'a' is of type 'unknown'.
}
```
* any 和 unknown 的区别？
1. 使用 any 做任何事情都是合法的，使用 unknown 类型的值做任何事情都是不合法的
2. unknown 类型 是 top type，不能作为子类型，但 any 类型没有这个问题
```TypeScript
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
*  **接口类型**
> 可以通过 interface 关键字约束对象类型
```TypeScript
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
* **对象类型**
> 特殊类型 object 指的是任何非基础值（ string、number、bigint、boolean、symbol、null 或 undefined）。这与空对象类型 { } 不同，也与全局类型 Object 不同。你很可能永远不会使用 Object。
#### 数组和元组类型
* **数组类型**
```TypeScript
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
* **元组类型**
> 元组（Tuple）是固定数量的不同类型的元素的组合
```TypeScript
const teacherInfo: [string, string, number] = ["Dell", "Alice", 88];  
const teacherInfo: readonly [string, string, number, number, boolean] = ["Tom", "male", 28, 5, true];
```
> 应用场景：csv格式的数据等，示例：
```TypeScript
const teacherList: [string, string, number][] = [
  ["dell", "male", 18],
  ["sun", "female", 22],
  ["jeny", "female", 28],
]
```
#### never和void类型
* **never类型**
> TypeScript 将使用 never 类型来表示不应该存在的状态

```TypeScript
function error(message: string): never  {  
    throw new Error(message)  
}
function loop(): never {  
    while(true){}  
}
```
  <u>应用场景</u>:
	...
* **void类型**
> 表示不返回值的函数的返回值，只要函数没有任何 `return` 语句，或者没有从这些返回语句返回任何显式值，它就是推断类型
```TypeScript
function log(msg): void {  
    console.log(msg)  
}
```
#### 枚举类型
* **特性:**
1. 自增长特性

   > 常量成员从第一个成员开始自动递增。如果没有显式地为成员赋值，它将从 0 开始，并且后续的成员会自动递增。

   ``````typescript
   enum Direction {  
   	North, // 0  
   	East,  // 1  
   	South, // 2  
   	West   // 3  
   }  
   enum Colors {  
   	red = 1,  
   	green = "abc",  
   	orange = 3,  
   	pink, // 4  
   	blue, // 5  
   }
   ``````

2. 反向映射特性   

   > 除了为成员创建具有属性名称的对象外，**数字枚举成员**还获得从枚举值到枚举名称的反向映射。

   ```typescript
   enum Enum {  
     A, // 0  
   }  
   let a = Enum.A;  
   let nameOfA = Enum[a];
   ```
* **场景：**
	- 数字枚举
	```TypeScript
	enum Types {  
		Red, // 0  
		Green = 5, // 5  
		Blue // 6  
	}  
	console.log(Types.Red) // 0
	```
	- 字符串枚举
	
	  > 在一个字符串枚举里，每个成员都必须用字符串字面量，或另外一个字符串枚举成员进行初始化。
	- 异构枚举
	
	  > 枚举可以混合字符串和数字成员
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
	
	- const枚举
	
	  > 大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 `const`枚举。 常量枚举通过在枚举上使用 const 修饰符来定义。且const 声明编译后为常量。
	
	  ```typescript
	  const enum Types {
	    No = "No",
	    Yes = 1,
	  }
	  ```
#### 类型推论和类型别名
* **类型推论**

  > TypeScript 会在没有明确的指定类型的时候推测出一个类型，这就是**类型推论**当变量被类型推断为一种类型时，不能够在给变量赋值的时候给别的类型如果你声明变量没有定义类型也没有赋值这时候TS会推断成any类型

  ```ts
  let a = "123456" //  被类型推断为string
  a = 123456 // 不能将类型“number”分配给类型“string”。ts(2322)
  let value // 被类型推断为any
  ```

* **类型别名**

  > 通过 type 使用同一个类型并用一个名称引用它，叫做类型别名

  ```ts
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

<u>类型别名 type 和接口 interface 的区别：</u>

1. type不能重复命名，重复命名 interface 会合并
2. interface 用于约束对象（函数也属于对象），type 没有这个限制
3. 将两个及其以上的类型合并时，interface 往往通过继承来实现（也可以通过交叉类型&），而 type 通过联合类型|来实现
4. type 可以定义联合类型和可以使用一些操作符，而 interface 不行

```TypeScript
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
#### 联合类型和交叉类型
* **联合类型**

  > 联合类型是由两种或多种其他类型组成的类型，表示可能是这些类型中的任何一种的值。我们将这些类型中的每一种都称为联合的成员。

  ```ts
  let a: number | string = "123"
  a = 123
  function printId(id: number | string) {
  	console.log("Your ID is: " + id);
  }
  printId("202")
  printId(101)
  ```

如果你有一个联合类型的值，你如何处理它？TypeScript 只有在对联合的每个成员都有效的情况下才允许操作。例如，如果你有联合 string | number，则不能使用仅在 string 上可用的方法：
```TypeScript
function printId(id: number | string) {
	console.log(id.toUpperCase()) // 将会报错
}
```
通过TypeScript的类型推论来缩小联合，比如：
```TypeScript
function printId(id: number | string) {
	if(typeof id === "string") {
		console.log(id.toUpperCase());
	} else {
		console.log(id)
	}
}
```
* **交叉类型**

  > 交叉类型是使用 & 运算符定义的

  ```ts
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
> 有时候，你非常清楚一个值的类型信息但TypeScript无法知道的值类型的信息，这时候就可以`as`使用**类型断言**
```TypeScript
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
> TypeScript 只允许类型断言转换为更具体或更不具体的类型版本。
> 有时，此规则可能过于保守，并且不允许可能有效的更复杂的强制转换。如果发生这种情况，你可以使用两个断言，然后是所需的类型：
```TypeScript
// declare 是 TypeScript 中用于声明类型和接口、模块、全局变量和函数等。
declare const expr: any;
type T = { a: 1, b: 2, c:3 };
const a = expr as any as T; // 或者 expr as unknown as T
```
使用类型断言缩小类型

```TypeScript
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

**非空断言运算符 !**

> 用于告诉编译器某个表达式不会是 null 或 undefined。当你确定某个值一定不会是 `null` 或 `undefined` 时，可以使用这个运算符来避免编译器发出错误或警告。

```TypeScript
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

#### 类型操作

###### 泛型

> 也称之为"动态类型"
```TypeScript
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

> 意思是泛型受到约束
```TypeScript
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
// keyof 运算符采用对象类型并生成其键的字符串或数字字面联合
function getValue<T extends object, K extends keyof T>(obj: T, arttribute: K) {
	return obj[arttribute]
}
```

###### keyof

###### 索引访问类型

###### 条件类型

###### 映射类型

###### 模板字面量类型

## 函数和类

#### 函数扩展
* **函数参数**

  ```ts
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

* **接口定义函数**

  ```ts
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

* **函数重载**

  > 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。
  > 可以通过编写**重载签名**来指定一个可以以不同方式调用的函数，然后通过编写**函数主体**来实现签名
  > **实现签名还必须与重载签名兼容**。但如果TypeScript没有检测出来，将不会报错...

  ```ts
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

* **使用this**
  	TODO

#### 类
> 关键字：[class](https://web.nodejs.cn/en-us/docs/web/javascript/reference/classes/)
> ES6提供了更接近传统语言的写法，引入了Class（类）这个概念，作为对象的模板。通过class关键字，可以定义类。基本上，ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。上面的代码用ES6的“类”改写，就是下面这样。
```TypeScript
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

* public 公共
  可以让你定义的变量 内部访问（继承的子类也能访问） 也可以外部访问 如果不写默认就是public

  ```ts
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

* private 私有
  代表定义的变量私有的只能在内部访问 不能在外部访问

  ```ts
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

* protected 保护
  代表定义的变量私有的只能在内部和继承的子类中访问 不能在外部访问

  ```ts
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
  tom.logLooks() //  在继承的子类中访问父类的 private 属性
  ```

##### 类继承

> implements 从句
> 通过使用 implements 子句来检查一个类是否满足特定的 interface。如果一个类未能正确实现它，则会触发错误

```ts
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
> 通过extends来创建另一个类的子类

```ts
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
// 子类通过declare可以声明更准确的类型，仅当 target >= ES2022` 或useDefineForClassFields为 true 时
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

```ts
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

## 其他

#### 声明文件和命名空间

##### 声明文件

通过 xxx.d.ts 来定义 TypeScript 的声明文件，并且通常伴随着使用 declare 关键字

declare 主要作用：让当前文件可以使用其他文件声明的类型。

> 比如：自己的脚本使用外部库定义的函数，编译器会因为不知道外部函数的类型定义而报错，这时就可以在自己的脚本里面使用`declare`关键字，告诉编译器外部函数的类型。

declare 关键字特点：

1. 它只是通知编译器某个类型是存在的，不用给出具体实现。
2. declare 只能用来描述已经存在的变量和数据结构，不能用来声明新的变量和数据结构。
3. declare 关键字也可以单独在TypeScript文件中声明，用于表示某个类型是存在的，可以在当前文件使用。

* declare variable

  declare 关键字可以给出外部变量的类型描述

  ```typescript
  // index.d.ts
  declare let x: number;
  // other.ts
  x = 123; // 正常编译
  ```

* declare function

  declare 关键字可以给出外部函数的类型描述，declare 关键字后面不能带有函数的具体实现。

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

* declare class

  使用declare class描述类或类类对象。

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

* declare namespace

  使用 declare namespace 来描述通过点分表示法访问的类型或值。在 declare namespace 里面加不加export关键字都可以。

  ```TypeScript
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

* declare global（不常用）

  为 JavaScript 引擎的原生对象添加属性和方法

* declare enum

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

1. 嵌套

   命名空间可以嵌套

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
2. 抽离

   用文件来抽离命名空间

   ```typescript
   // parent.ts
   export namespace V {
       export const a = 1
   }
   // child.ts
   import { V } from "./parent.ts"
   console.log(V.a)
   ```
3. 使用别名来简化命名

   使用 import q = x.y.z 为常用对象创建较短的名称

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
4. 合并

   重名的命名空间会合并，不管是同一个文件还是跨文件（需要引入跨文件）

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

#### 工具类型

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

``````ts
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
``````

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

```TypeScript
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

```Typescript
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

#### 三斜线指令

> 三斜杠指令是包含单个 XML 标记的单行注释，注释的内容用作编译器指令。
>
> 有且只有在其包含文件的顶部有效，之前只能有注释或者其他的三斜杠指令。

**常用：**

1. <reference path="..." /> `<reference path="..." />` 用作文件之间依赖的声明
2. <reference types="..." /> `<reference types="..." />` 用作声明对包的依赖, 该文件使用 @types/xxx/index.d.ts 中声明的名称
3. <reference lib="..." /> `<reference lib="..." />` 指令允许文件显式包含现有的内置 lib 文件
```TypeScript
/// <reference path="../../namespace/validation.ts" />
/// <reference types="express" />
/// <reference lib="ES2017.string" />
/// <reference lib="DOM" />
namespace Validation {
  const letterRegExp = /^[A-Za-z]+$/
  export class LettersOnlyValidator implements StringValidator {
    isAcceptable(s: string): boolean {
      return letterRegExp.test(s)
    }
  }
}
const userName = "abcUIO"
const validator = new Validation.LettersOnlyValidator()
console.log(validator.isAcceptable(userName))
console.log("foo".padStart(10, "*"))
// const el: HTMLSpanElement = document.createElement("span")
```
