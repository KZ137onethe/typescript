import "reflect-metadata";

// ? 装饰器工厂
// "装饰器工厂"是一个返回装饰器函数的工厂函数。通过使用装饰器工厂，你可以创建可配置的装饰器，它们允许你在装饰器执行之前传递参数。
function decoratorFactory(params: any) {
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

// ? 装饰器组成
// 可以将多个装饰器应用于声明，例如在一行或多行：
// @f @g @x

// @f
// @g
// @x

// 当多个装饰器应用于单个声明时，类似与数学中的组合函数，如：应用f和g时，等效于f(g(x))，所以规律：
// 1. 每个装饰器的表达式都是从上到下计算的。
// 2. 然后将结果作为函数从下到上调用。
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

// ? 类装饰器
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
  
  constructor(name: string, attrs: FruitAttrs) {
    this.name = name;
    this.color = attrs.color;
    this.createTime = attrs.createTime;
  }
}

const banana = new Fruit('banana', { color: 'yellow', createTime: new Date(Date.UTC(2024, 7, 23, 8, 5, 55)) });
console.log((banana as any).source)

// ? 方法装饰器
function enumerable(value: boolean) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = value
  }
}

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

// ? 访问器装饰器
function configurable(value: boolean) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.configurable = value
  }
}
class Point {
  constructor(private _x: number, private _y: number) {}

  @configurable(false)
  get x(){
    return this._x
  }

  @configurable(false)
  get y(){
    return this._y
  }
}

// ? 属性装饰器
const formatKey = Symbol('format')
const format = (formatString: string) => Reflect.metadata(formatKey,formatString)
const getFormat = (target: any, propertyKey: string) => Reflect.getMetadata(formatKey, target, propertyKey)
class HotelGreeter {
  @format("Good morning, %s")
  greeting: string;
  constructor(customer: string) {
    this.greeting = customer
  }
  greet() {
    let formatString = getFormat(this, "greeting")
    return formatString.replace('%s', this.greeting)
  }
}

const bob = new HotelGreeter("Tom")
console.log(bob.greet())


// ? 参数装饰器
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

// 上面装饰器的作用和没用装饰器时几乎没什么区别，因为TypeScript有类型推论
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

// ? 元数据
// 引入 reflect-metadata 这个包，并使用元数据的特性，像上面已经使用了，下面将举一个简单的例子

import 'reflect-metadata';

// 属性装饰器工厂函数
function StoreMetadata(metadataKey: string) {
  return function(target: Object, propertyKey: string) {
    Reflect.defineMetadata(metadataKey, `The ${propertyKey} of the ${target.constructor.name}`, target, propertyKey);
  };
}

class Person {
  @StoreMetadata('description')
  name: string;
  
  @StoreMetadata('description')
  age: number;
  
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

// 获取并打印属性的元数据
function printMetadata(target: any) {
  for (const propertyKey in target) {
    const metaData = Reflect.getMetadata('description', target, propertyKey);
    console.log(`${propertyKey}:${metaData}`);
  }
}

const person = new Person('Alice', 30);
printMetadata(person); // 输出: name: The name of the person, age: The age of the person
