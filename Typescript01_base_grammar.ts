interface Point {
  x: number,
  y: number,
}

function tsDemo(data: Point) {
  return Math.sqrt(Math.pow(data.x, 2) + Math.pow(data.y, 2));
}

console.log(tsDemo({x: 3, y: 4}));

const a: number = 3.1415926;
a.toFixed(2)

// 基础类型 null, undefined, symbol, boolean, void
const count: number = 123;
const teacherName: string = "Dell";

// 对象类型
class Person {}

const teacher: {
  name: string,
  age: number,
} = {
  name: "Dell",
  age: 23,
}

const numbers: number[] = [1, 2, 3, 4, 5, 6];
const dell: Person = new Person();
const getTotal: () => number = () => {
  return 123;
}

// type annotation 类型注解，我们来告诉 TS 变量是什么类型
// type inference 类型推断，TS 会自动的去尝试分析变量的类型
// 如果 TS 能够自动分析变量类型，我们就什么也不需要做了
// 如果 TS 无法分析变量类型的话，我们就需要使用类型注解

let counter: number;
counter = 123;

let countInference = 123;
// const firstNumber = 1;
// const secondNumber = 2;
// const total = firstNumber + secondNumber;

function getCount(firstNumber: number, secondNumber: number) {
  return firstNumber + secondNumber;
}

const total = getCount(1, 2);

function add (first: number, second: number): number {
  return first + second;
}

// void 表示没有返回值
function sayHello():void {
  console.log("hello, world!")
}

// never 表示不会执行到作用域末尾
function errorEmitter(): never {
  throw new Error("This is Error!");
  console.log("ok!")
}


// 解构语法
function getNumber({ first, second }: { first: number, second: number }) {
  return first + second;
}

// 基础类型，boolean, number, string, void, undefined, symbol, null


// 对象类型，{}，Class, function, []
const func = (str: string) => {
  return parseInt(str, 10);
}

const func1: (str: string) => number = (str) => {
  return parseInt(str, 10);
}

const date = new Date();

// 其他的case
interface Person {
  name: string,
}

const rawData = '{"name": "dell"}';
const newData: Person = JSON.parse(rawData);

let temp = 123;

const numberArr: number[] = [1, 2, 3];
const arr: (number | string)[] = [1, "2", 3];
const stringArr: string[] = ["a", "b", "c"];
const undefinedArr: undefined[] = [undefined, undefined];
const objectArr: {name: string}[] = [
  { name: "dell" },
  { name: "" },
]

type User = { name: string, age: number };
const objectArr2: User[] = [
  { name: "John", age: 18 }
]

class TeacherExample {
  name: string | undefined;
  age: number | undefined;
}
const objectArr3: TeacherExample[] = [
  new TeacherExample(),
  {
    name: "Mary",
    age: 23,
  },
  {
    name: "Bob",
    age: 34,
  }
]

// 元组 tuple
const teacherInfo: [string, string, number] = ["Dell", "Alice", 88]; // 这里代表数组第一第二项是string类型，第三项为number类型

// 比如：csv格式的数据
const teacherList: [string, string, number][] = [
  ["dell", "male", 18],
  ["sun", "female", 22],
  ["jeny", "female", 28],
]

//  interface 接口
interface PersonOne {
  // readonly 只读
  name: string,
  // 可有可无
  age?: number,
  [propName: string]: any,
  say(): string,
}

interface Teacher extends PersonOne {
  teach(): string;
}

interface SayHi {
  (word: string): string;
}

const getPersonName = (person: PersonOne): void => {
  console.log(person.name);
}
const setPersonName = (person: Teacher, name: string): void => {
  person.name = name;
}

const person = {
  name: "dell",
  sex: "male",
  say() {
    return "hello";
  },
  teach() {
    return "teach";
  }
}

getPersonName(person);
setPersonName(person, "lee");

// implements 应用
class Users implements PersonOne {
  name = "Dell";
  say() {
    return "hello";
  }
}

// 类的定义与继承
class PersonTwo {
  name = "dell";
  getName() {
    return this.name;
  }
}

class TeacherTwo extends PersonTwo {
  getTeacherName() {
    return "Teacher is: " + this.getName();
  }
  getName() {
    return super.getName() + "lee";
  }
}

const person2 = new PersonTwo();
const teacher2 = new TeacherTwo();
console.log(person2.getName());
console.log(teacher2.getName(), teacher2.getTeacherName());

// 类中访问类型 private, protected, public 访问类型
// private 允许我在类的内外被调用
// public 允许我在类内被使用
// protected 允许在类内及继承的子类中访问使用
class PersonThere {
  public name: string | undefined;
  public sayHi() {
    console.log('hi');
  }
}

const person3 = new PersonThere();
person3.name = "dell";
console.log(person.name);
person3.sayHi();

class PersonFour {
  private name: string | undefined;
  public sayHi() {
    this.name;
    console.log('hi');
  }
}

const person4 = new PersonFour();
// person4.name = "dell" // 这里不可在外部修改

class PersonFive {
  protected name: string | undefined;
  public sayHi() {
    console.log('hi');
  }
  private sayABC() {
    this.sayHi();
    this.name;
  }

  constructor(name: string | undefined) {
    this.name = name;
  }
}

class TeacherFive extends PersonFive {
  public sayBye() {
    this.sayHi()
    console.log(this.name);
  }
}

const person5 = new PersonFive("Bob");
const teacher5 = new TeacherFive("dell")
teacher5.sayBye();

// constructor
class PersonSix {
  // public name: string | undefined;
  // constructor(name: string | undefined) {
  //   this.name = name;
  // }

  // 简化写法：
  constructor(public name: string | undefined) {

  }
}

const person6 = new PersonSix("Tiny");
console.log(person6.name);

class PersonSeven {
  constructor(public name: string) {}
}

class TeacherSeven extends PersonSeven {
  constructor(name: string, public age:number) {
    super(name)
  }
}

const person7 = new TeacherSeven("Tom", 28);
console.log(person7.name, person7.age);

// 静态属性，Setter()和Getter()
class PersonEight {
  constructor(private _firstName: string, private _lastName: string) {}
  get getName() {
    return this._firstName + this._lastName;
  }
  set setName(fullName: string) {
    const nameMap = new Map(fullName.split(" ").map((item, index) => [index, item]))
    if(nameMap.size === 2){
      this._firstName = nameMap.get(0) || "";
      this._lastName = nameMap.get(1) || "";
    }
  }
}

const person8 = new PersonEight("Ted", "Cooper")

// 规避通过外部的 new 方法来创建类示例
// 下面是使用一个单例模式的场景
class Demo {
  private static instance: Demo;
  private constructor(public fullName: string) {}

  static getInstance(fullName: string) {
    if(!this.instance) {
      this.instance = new Demo(fullName)
    }
    return this.instance;
  }
}

// const demo1 = new Demo(); // 不可以通过 new 方法来创建类示例
const demo2 = Demo.getInstance("Baldwin Job");
const demo3 = Demo.getInstance("Stephanie Funk");
console.log(demo2.fullName, demo3.fullName);

// 抽象类
class PersonNine {
  constructor(public readonly name: string) {}
}

const person9 = new PersonNine("Dell");
// person9.name = "Mary" // 只读属性，不可写

// 抽象 abstract
abstract class Geom {
  public width?: number;
  getType() {
    return "Geom";
  }
  abstract getArea(): number;
  abstract getCircumference(): number;
}

class Circle extends Geom {
  private PI = 3.1415926
  constructor(public width: number) {
    super()
  }

  getArea() {
    return parseFloat(`${this.PI * Math.pow( this.width/2 , 2)}`)
  }

  getCircumference() {
    return parseFloat(`${this.PI * this.width}`)
  }
}

class Square extends Geom {
  constructor(public width: number) {
    super()
  }

  getArea() {
    return Math.pow(this.width, 2);
  }

  getCircumference() {
    return 4 * this.width;
  }
}

