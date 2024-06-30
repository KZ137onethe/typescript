介绍：TypeScript 是一种由微软开发的开源编程语言，是 JavaScript 的超集，支持静态类型检查和最终被编译为纯 JavaScript 执行。它通过类型系统提供更强大的代码编辑、重构、调试和维护能力，适合大型项目和团队协作。
参考视频：
1. [Dell-TypeScript 系统入门到项目实战](https://www.alipan.com/t/SdVsRD09wSM1VkvOF7CH
2. [小满TypeScript基础教程全集](https://www.bilibili.com/video/BV1wR4y1377K/?spm_id_from=333.337.search-card.all.click&vd_source=1c6268f99220acd2592c93a3a87cbe31)
> p15、p16、p21~36
参考文档：
1. [TypeScript 中文网](https://ts.nodejs.cn/)
>	当前版本v5.5
1. [TypeScript](https://www.typescriptlang.org/)
2. [小满zs的TypeScript的收藏集](https://blog.csdn.net/qq1195566313/category_11559497.html?spm=1001.2014.3001.5515)

训练场：[TypeScript Playground](https://www.typescriptlang.org/play/)

安装
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
[学习TypeScrip13（symbol类型）](https://xiaoman.blog.csdn.net/article/details/122463630)
#### 任意类型
**any 类型**
> any 类型代表任何值。

**unknown 类型**
> unknown 类型代表任何值。这类似于 `any` 类型，但更安全\
```

```
#### 接口与对象类型
**接口类型**
> 可以通过 interface 关键字约束对象类型
```TypeScript
// ?. 可选  
// readonly 只读  
// [xxx: 类型] 任意类型  
interface Person {  
    b?: string,  
    readonly a: string,  
    [propName: string]: any,  
    fn(): void,  
}
```
**对象类型**
> 特殊类型 object 指的是任何非基础值（ string、number、bigint、boolean、symbol、null 或 undefined）。这与空对象类型 { } 不同，也与全局类型 Object 不同。你很可能永远不会使用 Object。
##### 数组和元组类型
**数组类型**
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
**元组类型**
> 元组（Tuple）是固定数量的不同类型的元素的组合
```TypeScript
const teacherInfo: [string, string, number] = ["Dell", "Alice", 88];  
const teacherInfo: readonly [string, string, number, number, boolean] = ["Tom", "male", 28, 5, true];
```
应用场景：csv格式的数据等，示例：
```TypeScript
const teacherList: [string, string, number][] = [
  ["dell", "male", 18],
  ["sun", "female", 22],
  ["jeny", "female", 28],
]
```
#### never和void类型
**never类型**
> TypeScript 将使用 never 类型来表示不应该存在的状态

```TypeScript
function error(message: string): never  {  
    throw new Error(message)  
}
function loop(): never {  
    while(true){}  
}
```
应用场景：
**void类型**
> 表示不返回值的函数的返回值，只要函数没有任何 `return` 语句，或者没有从这些返回语句返回任何显式值，它就是推断类型
```TypeScript
function log(msg): void {  
    console.log(msg)  
}
```
##### 枚举类型
**特性:**
1. 自增长特性
> 常量成员从第一个成员开始自动递增。如果没有显式地为成员赋值，它将从 0 开始，并且后续的成员会自动递增。
```TypeScript
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
```
2. 反向映射特性   
> 除了为成员创建具有属性名称的对象外，**数字枚举成员**还获得从枚举值到枚举名称的反向映射。
```TypeScript
enum Enum {  
  A, // 0  
}  
let a = Enum.A;  
let nameOfA = Enum[a];
```
**场景：**
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
```TypeScript
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
> 大多数情况下，枚举是十分有效的方案。 然而在某些情况下需求很严格。 为了避免在额外生成的代码上的开销和额外的非直接的对枚举成员的访问，我们可以使用 `const`枚举。 常量枚举通过在枚举上使用 const 修饰符来定义。
> 且const 声明编译后为常量。
```TypeScript
const enum Types = {  
	No = "No",  
	Yes = 1,  
}
```
## 函数和类
#### 函数扩展
**函数参数**
```TypeScript
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
**接口定义函数**
```TypeScript
// 定义参数 num 和 num2  ：后面定义返回值的类型
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
**函数重载**
> 重载是方法名字相同，而参数不同，返回类型可以相同也可以不同。
> 可以通过编写**重载签名**来指定一个可以以不同方式调用的函数，然后通过编写**函数主体**来实现签名
```TypeScript
// 重载签名
function fn(...params: any[]): void 
function fn(...params: [string, number, boolean]): void
// 函数主体来实现签名
function fn(...params: any[]): void {
    if(params.length === 3) {
	    console.log("name:", params[0], "age:", params[1], "is male:", params[2])
    } else {
	    console.log(...params)
    }
}
fn('mary', 32, false, 5, "no")
fn('tom', 24, true)
```
**使用this**
	TODO

#### 类
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
**类的修饰符**
> public 公共
> 	可以让你定义的变量 内部访问（继承的子类也能访问） 也可以外部访问 如果不写默认就是public
```TypeScript
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
> private 私有
> 	代表定义的变量私有的只能在内部访问 不能在外部访问
```TypeScript
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
> protected 保护
> 	代表定义的变量私有的只能在内部和继承的子类中访问 不能在外部访问
```TypeScript
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

TODO:
1. extends 和 implement 的区别
2. 函数重载的 重载签名 不是 包含关系的时候，函数主体实现的参数可以是重载签名的其中一种吗
3. 作用域，垃圾回收机制