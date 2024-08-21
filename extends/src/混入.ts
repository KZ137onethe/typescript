// 对象混入
// 对象混入就是 A对象 和 B对象 合并
interface SchoolInfo {
  school: string,
  location: string | string[],
  createTime: Date | Date[]
}

interface Person {
  name: string,
  age: number,
  sex: "man" | "woman"
  [prop: string]: any
}

let QingQuanSchool: SchoolInfo = {
  school: "QingQuan",
  location: ["xx省xx市xx区xx", "xx省xx市xx区xx"],
  createTime: [new Date("1993-12-01"), new Date("2001-07-21")]
}

let tom: Person = {
  name: 'tom',
  age: 22,
  sex: 'man',
  work: 1
}

// ...扩展运算符, 浅拷贝 将返回新的类型
const tom_work = { ...QingQuanSchool, ...tom }
// Object.assign(), 浅拷贝 将返回交叉类型
const anthor_tom = Object.assign({}, QingQuanSchool, tom)

// structuredClone 深拷贝 将返回新的类型
// 需要node18以上，具体： https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone
const copy_tom = structuredClone({ ...QingQuanSchool, ...tom })

tom_work.createTime[1] = new Date("2003-03-21")
copy_tom.createTime[1] = new Date("2002-09-12")
console.log(tom_work.createTime[1] === QingQuanSchool.createTime[1], tom_work.createTime[1] === copy_tom.createTime[1])


// 类的混入
// A类 B类 合并到一起
class X {
  type: boolean;
  constructor() {
    this.type = false;
  }
  changeType() {
    this.type = !this.type;
    return this.type
  }
}

class Y {
  name: string;
  constructor() {
    this.name = '张三';
  }
  getName(): string {
    return this.name;
  }
}

class C {
  type: boolean;
  name: string;
  constructor(name: string, type: boolean) {
    this.type = type; // 初始化type属性
    this.name = name; // 初始化name属性
  }
}

function Mixin(curCls: any, itemCls: any[]) {
  itemCls.forEach(item => {
    Object.getOwnPropertyNames(item.prototype).forEach((name) => {
      // 仅当目标类原型上没有同名方法时才进行混合
      if (!curCls.prototype[name]) {
        curCls.prototype[name] = item.prototype[name];
      }
    });
  });
}

Mixin(C, [X, Y]);

// 创建C的实例来测试混合的方法
const cInstance = new C('李某某', false);
console.log(Object.keys(C.prototype)); // 输出原型上的方法列表
console.log((cInstance as X & Y).changeType(), (cInstance as X & Y).getName());

// 例子：插件类型的混入
class App {
  run () {
    console.log('run')
  }
}

class Logger {
  log(msg: string) {
    console.log(msg)
  }
}

class Html {
  render() {
    console.log('render')
  }
}

type Constructor<T> = new (...args: any[]) => T
// 这里将返回一个类的定义，需要用类表达式的方式使用，返回的类是匿名的
// 下面的使用类似于这样：mixins 相当于 Rectangle，app 相当于 square
// const Rectangle = class {
//   constructor(public height: number,public width: number) {}
// };
// const square = new Rectangle(100, 100)
function pluginMixins<T extends Constructor<App>>(Base: T) {
  return class extends Base {
    private Logger!: Logger
    private Html!: Html
    constructor(...args: any[]) {
      super(...args)
      // 类的委托
      this.Logger = new Logger()
      this.Html = new Html()
    }
    run() {
      this.Logger.log('log run');
      super.run()
    }
    render () {
      this.Logger.log('log render')
      this.Html.render()
    }
  }
}

class Dog extends App {
  public name: any;
  constructor(name) {
    super();
    this.name = name
  }
  run() {
    console.log(`this dog named ${this.name} is run!`)
  }
}

const mixins = pluginMixins(Dog)
const app = new mixins('Jenny')
app.run()
app.render()
