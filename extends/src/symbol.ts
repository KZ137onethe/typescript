let a1:symbol = Symbol(1) // 唯一的
let a2:symbol = Symbol(1) // 唯一的

console.log(a1, a2, a1 === a2)

// Symbol.for(key) 会从全局去寻找 是否注册过这个key, 如果没有找到的话将会创建一个
console.log(Symbol.for('xiaoman') === Symbol.for('xiaoman'))

// symbol 主要是为了对象中去除重复的属性
let obj1 = {
  name: "zhangsan",
  [a1]: 111,
  [a2]: 222
}

console.log(obj1)

// 如何遍历obj1取到symbol类型的属性呢？
// for...in / Object.keys() / Object.getOwnPropertyNames() 都无法取到symbol类型的属性

// 通过 Object.getOwnPropertySymbols() 获取到 symbol, 但是不能同时取到其他的类型的属性
console.log(Object.getOwnPropertySymbols(obj1))

// 通过反射 Reflect.ownKeys(obj)
console.log(Reflect.ownKeys(obj1))