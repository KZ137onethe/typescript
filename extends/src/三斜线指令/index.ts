// 三斜杠指令是包含单个 XML 标记的单行注释。注释的内容用作编译器指令
// 有且只有在其包含文件的顶部有效，之前只能有注释或者其他的三斜杠指令。
/**
 * 1. <reference path="..." /> 用作文件之间依赖的声明
 * 2. <reference types="..." /> 用作声明对包的依赖, 该文件默认使用 @types/xxx/index.d.ts 中声明的名称，可以通过tsconfig.json的compilerOptions.typeRoots来配置
 * 3. <reference lib="..." /> 指令允许文件显式包含现有的内置 lib 文件, 内置 lib 文件的引用方式与 tsconfig.json 中的 json的compilerOptions.lib 编译器选项相同
 * 4. <reference no-default-lib="true"/> 该指令将文件标记为默认库,且编译器不在编译中包含默认库, 如：xxx.d.ts; 当tsconfig.json中配置 skipDefaultLibCheck 为 true，会跳过具有这种类型文件的检查
 *    TODO：具体示例看 custom.ts, 代码目前有问题暂不讲解
 * 5. <amd-module /> 告诉 TypeScript 编译器，当前文件应该被编译为 AMD 模块
 *    目前AMD模块我都没使用过，这里不做举例，具体看 https://ts.nodejs.cn/docs/handbook/triple-slash-directives.html#-amd-module-
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
