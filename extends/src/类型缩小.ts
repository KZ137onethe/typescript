// 通过 typeof 来缩小类型, 但 typeof 无法判断 null 和 object等等

import { API } from '../namespace/API';

function padLeft(padding: number | string, input: string): string {
  if(typeof padding === 'number') {
    return " ".repeat(padding) + input
  }
  return padding + input
}

// 这时，可以通过真值来缩小类型
function printAll(strs:string | string[] | null): void {
  if(strs && typeof strs === 'object') {
    for(let str in strs) {
      console.log(str)
    }
  } else if(typeof strs === 'string') {
    console.log(strs)
  }
}

// 这里忽略了 str 为空字符时，不会打印的问题
function printAll1(strs: string | string[] | null): void {
  if(strs) {
    if(typeof strs === 'object') {
      for(let str in strs) {
        console.log(str)
      }
    } else if(typeof strs === 'string') {
      console.log(strs)
    }
  }
}

// 相等性缩小，比如：switch === !== == !=
// 通过相等性缩小来解决 printAll1 函数的问题
function printAll2(strs: string | string[] | null): void {
  if(strs !== null) {
    if(typeof strs === 'object') {
      for(const s of strs) {
        console.log(s)
      }
    } else if(typeof strs === 'string') {
      console.log(strs)
    }
  }
}

// in 缩小
// 当可选属性存在于两侧
type Fish = { swim: () => void }
type Bird = { fly: () => void }
type HuMan = { swim?: () => void, fly?: () => void }

function move(animal: Fish | Bird) {
  if('swim' in animal) {
    return animal.swim()
  }
  return animal.fly()
}

// instanceof 缩小 ，instanceof 用于判断左侧对象是否是右侧类的实例
function logTime(value: Date | string) {
  if(value instanceof Date) {
    console.log(value.toUTCString())
  } else {
    console.log(value.toLowerCase())
  }
}

// 赋值，typescript 有类型推论，会查看赋值的右侧来适当的缩小左侧
let variableX = Math.random() < 0.5 ? 10 : "hello, world!"
variableX = 1;

// 使用类型谓词 --- 谓词采用 parameterName is Type 的形式
// 比如：下面 isFish 函数返回值为true时，pet会被认为是Fish
function isFish(pet: Fish | Bird):pet is Fish {
  return (pet as Fish).swim !== undefined
}

const nini = API.getPetInfo() as (Fish | Bird)
if(isFish(nini )) {
  nini.swim()
} else {
  nini.fly()
}
// 另外 类 可以使用 this is Type 来缩小他们的类型


// 使用类型断言，之前使用过，这里举一个简单的例子
function formatInput(input: string | number) {
  if((input as string).toUpperCase()) {
    console.log("formatted string:", (input as string).toUpperCase())
  } else {
    console.log("formatted number:", (input as number).toFixed(2))
  }
}

// 判别联合
interface Circle {
  kind: 'circle',
  radius: number,
}
interface Square {
  kind: 'square',
  sideLength: number
}
type Shape = Circle | Square
function getArea(shape: Shape) {
  if(shape.kind === 'circle') {
    return Math.PI * shape.radius ** 2
  } else if(shape.kind === 'square') {
    return shape.sideLength ** 2
  }
}

// 配合never进行穷举检查
function getArea2(shape: Shape) {
  switch(shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2
    case 'square':
      return shape.sideLength ** 2
    default:
      const _exhaustiveCheck: never = shape
      return _exhaustiveCheck
  }
}
