// 对象混入
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
  name: "Tom",
  age: 22,
  sex: "man",
  work_location_index: 1
}

// 浅拷贝
// ...扩展运算符, 将返回新的类型
const tom_work = { ...QingQuanSchool, ...tom }
// Object.assign(), 将返回交叉类型
const anthor_tom = Object.assign({}, QingQuanSchool, tom)

// 深拷贝 需要node18以上
// https://developer.mozilla.org/zh-CN/docs/Web/API/structuredClone
const copy_tom = structuredClone({ ...QingQuanSchool, ...tom })

tom_work.createTime[1] = new Date("2003-03-21")
copy_tom.createTime[1] = new Date("2002-09-12")
console.log(tom_work.createTime[1] === QingQuanSchool.createTime[1], tom_work.createTime[1] === copy_tom.createTime[1])


// 类的混入
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
function pluginMixins<T extends Constructor<App>>(Base: T) {
  return class extends Base {
    private Logger!: Logger
    private Html!: Html
    constructor(...args: any[]) {
      super(...args)
      this.Logger = new Logger()
      this.Html = new Html()
    }
    run () {
      this.Logger.log('run')
    }
    render () {
      this.Logger.log('render')
      this.Html.render()
    }
  }
}

const mixins = pluginMixins(App)
const app = new mixins()
app.run()