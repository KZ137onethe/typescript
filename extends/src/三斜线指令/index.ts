// 三斜杠指令是包含单个 XML 标记的单行注释。注释的内容用作编译器指令
// 有且只有在其包含文件的顶部有效，之前只能有注释或者其他的三斜杠指令。
/**
 * 1. <reference path="..." /> 用作文件之间依赖的声明
 * 2. <reference types="..." /> 用作声明对包的依赖, 该文件使用 @types/xxx/index.d.ts 中声明的名称
 * 3. <reference lib="..." /> 指令允许文件显式包含现有的内置 lib 文件
 */
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