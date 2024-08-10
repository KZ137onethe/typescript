
const Base: ClassDecorator = (target) => {
  // console.log(target);
  target.prototype.test = '测试'
  target.prototype.fn = () => {
    console.log("憨憨")
  }
}

@Base
class HTTP {
  // ...
}

const http = new HTTP() as any
console.log(http.test)

// 装饰器工厂
const Base2 = (name: string) => {
  const fn: ClassDecorator = (target) => {
    target.prototype.test = '测试'
    target.prototype.fn = () => {
      console.log("憨憨")
    }
  }
  return fn
}

@Base2("xiao ming")
class HTTP2 {
  // ...
}

const http2 = new HTTP2() as any
console.log(http2.test)