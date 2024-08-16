interface Options {
  el: string | HTMLElement
}

interface VueCls {
  options: Options,
  init(): void
}

interface Vnode {
  tag: string,
  text?: string,
  children?: Vnode[]
}

class Dom {
  // 创建节点的方法
  private createELement(el: string) {
    return document.createElement(el)
  }
  // 填充文本的方法
  private setText(el: HTMLElement, text: string) {
    el.textContent = text
  }
  // 渲染函数
  protected render (data: Vnode) {
    let root = this.createELement(data.tag)
    if(data.children && Array.isArray(data.children)) {
      data.children.forEach(item => {
        let childEl = this.render(item)
        root.appendChild(childEl)
      })
    }else {
      this.setText(root, data.text!)
    }
    return root
  }
}

class Vue extends Dom implements VueCls {
  constructor(public options: Options) {
    super()
    this.init()
  }
  // 静态方法中也只能调用静态方法或者属性
  static version() {
    return '1.0.0'
  }
  init(): void {
    let data: Vnode = {
      tag: "div",
      children: [
        {
          tag: "section",
          text: "我是子节点1"
        },
        {
          tag: "section",
          text: "我是子节点2"
        }
      ]
    }
    let app = typeof this.options.el === "string" ? document.querySelector(this.options.el) : this.options.el
    app!.appendChild(this.render(data))
  }
}

let vue = new Vue({
  el: "#app"
})

// console.log(Vue.version())

// 类继承
// implements 从句
// 通过使用 implements 子句来检查一个类是否满足特定的 interface。如果一个类未能正确实现它，则会触发错误
interface Pingable {
  ping(): void;
}

class Socket implements Pingable {
  ping () {
    console.log("ping!")
  }
}

// 1.通过 implements 子句检查多个接口
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

// 2.implements 子句检查类是否满足于特定的接口，但不会改变类的类型或其方法
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

// 索引签名
class MyClass {
  // 和其他对象的索引签名一样
  [s: string]: boolean | ((s: string) => boolean);
  
  check(s: string) {
    return this[s] as boolean;
  }
}


//类的修饰符
// public 公共
// 可以让你定义的变量 内部访问（继承的子类也能访问） 也可以外部访问 如果不写默认就是public
// 在TypeScript是不允许直接在constructor 定义变量的 需要在constructor上面先声明
// class Person {
// 	name: string;
// 	age: number
// 	constructor(name: string, age: number) {
// 		this.name = name
// 		this.age = age
// 	}
// 	run() {
// 		console.log(this.name, this.age)
// 	}
// }
// // 可以简写 public 是默认修饰符
// class Person1 {
// 	constructor(public name: string, public age: number) {}
// 	run() {
// 		console.log(this.name, this.age)
// 	}
// }

// private 私有
// 代表定义的变量私有的只能在内部访问 不能在外部访问
// class Person {
// 	constructor(public name: string, public age: number, private looks: string) {}
// 	log() {
// 		console.log(this.name, this.age)
// 	}
// 	logPrivateLooks() {
// 		console.log(this.looks)
// 	}
// }
// const tom = new Person('Tom', 23, "good")
// console.log(tom.logPrivateLooks()) // 内部访问
// console.log(tom.looks) // 属性“looks”为私有属性，只能在类“Person1”中访问。ts(2341)

// protected 保护
// 代表定义的变量私有的只能在内部和继承的子类中访问 不能在外部访问
// class Person {
// 	constructor(public school: string, protected name: string, protected age: number, private looks: string) {}
// 	log() {
// 		console.log(this.name, this.age)
// 	}
// 	logSchool() {
// 		console.log(this.school)
// 	}
// 	logPrivateLooks() {
// 		console.log(this.looks)
// 	}
// }

// class Teacher extends Person {
// 	constructor(school: string, name: string, age: number, looks: string, public teachAge: number) {
// 		super(school, name, age, looks)
// 	}
// 	log() {
// 		super.log()
// 	}
// 	logSchool() {
// 		super.logSchool()
// 	}
// 	logLooks() {
// 	  console.log(this.looks)
// 	}
// }
// const tom = new Teacher('xx中学', 'Tom', 23, 'good', 1)
// tom.log() // 在继承的子类中访问父类的 protected 属性
// tom.logSchool() // 在继承的子类中访问父类的 public 属性
// tom.logLooks() // &nbsp;在继承的子类中访问父类的 private 属性

// 基类 或者叫 抽象类
// abstract 所定义的抽象类
// abstract 所定义的方法 只能进行一个描述，不能进行一个实现
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


// this 类型
class Box {
  contents: string = ""
  set(value: string) {
    this.contents = value
    return this
  }
  sameAs(other: this) {
    return other.contents === this.contents
  }
}

class ClearableBox extends Box {
  clear() {
    this.contents = "";
  }
}

class DerivedBox extends Box {
  otherContent: string = "?"
}

// 在类中，一种称为 this 的特殊类型动态地引用当前类的类型。
const a = new ClearableBox();
const b = a.set("hello");
const base = new Box();
const derived = new DerivedBox();
// “Box”类型的参数不可分配给“DerivedBox”类型的参数。
// 类型“Box”中缺少属性“otherContent”，但类型“DerivedBox”中需要属性。
// derived.sameAs(base)


// this 型类型保护
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep
  }
  isDirectory(): this is Directory {
    return this instanceof Directory
  }
  isNetWorked(): this is NetWorked & this {
    return this.networked;
  }
  constructor(public path:string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false)
  }
}
class Directory extends FileSystemObject {
  children!: FileSystemObject[];
}
interface NetWorked {
  host: string
}
const fso: FileSystemObject = new FileRep('foo/bar.txt', "foo")

// 通过this类型保护 来对特定字段进行延迟验证
class Ball<T> {
  value?: T;
  hasValue(): this is { value: T } {
    return this.value !== undefined
  }
}
const basketball = new Ball<string>()
basketball.value = 'game boy!'
if(basketball.hasValue()) {
  console.log(basketball.value)
}
