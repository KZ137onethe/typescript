// 命名空间
// 1.用法
// 2.嵌套
// 3.抽离
// 4.使用别名来简化命名
// 5.合并
import { customValidator } from "../namespace/customValidator"
import ZipCodeValidator = customValidator.ZipCodeValidator

export namespace Test {
  export let a = 1
  export const add = (a: number, b: number) => a + b

  export namespace Fn {
    export function foo() {
      console.log("foo!")
    }
  }
}

// 同名的命名空间会合并
export namespace Test {
  export function nowDate() {
    console.log(new Date())
    return new Date()
  }
}

console.log(Test.a, Test.add(1, 23))
Test.Fn.foo()
Test.nowDate()
const defaultA = "32451"
const checkNumber = new ZipCodeValidator()
checkNumber.isAcceptable(defaultA)