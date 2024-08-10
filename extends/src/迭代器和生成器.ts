function* gen() {
  yield Promise.resolve('one')
  yield 'two'
  yield 'there'
  yield 'four'
  yield 'five'
}

const numbers_1 = gen()
// console.log(numbers)
// console.log(numbers.next())
// console.log(numbers.next())
// console.log(numbers.next())
// console.log(numbers.next())
// console.log(numbers.next())
// console.log(numbers.next())


let set: Set<number> = new Set([1, 1, 2, 2, 3, 3, 4, 4]);
let map: Map<string, object> = new Map([
  ['abcdef', { name: 'bob'}],
  ['defget', { name: 'tom'}]
])
let arr = ['1', '2']
let str = 'abcdefghe'

function foo(args: any) {
  console.log(arguments)
}

// 像上面的 Set,Map,arguments(类数组), Array, String, Int32Array,Uint32Array 等都是有迭代方法的
const each = <T>(value: Iterable<T>) => {
  let It: Iterator<T, any, undefined> = value[Symbol.iterator]()
  let next: any = { done: false }
  while(!next.done) {
    next = It.next()
    if(!next.done) {
      console.log(next.value)
    }
  }
}

// each(arr)
// each(set)
// each(map)
// each(str)

// 迭代器的语法糖 for...of 循环遍历一个可迭代对象, 普通对象无法使用for...of语法（因为无法进行迭代）
for(let value of map) {
  console.log(value)
}

// TODO:与for...in不同
for(let value in map) {
  console.log(value)
}

// 解构的底层也是调用 iterator

// 对象支持for...of写法
const obj2 = {
  min: 0,
  max: 7,
  [Symbol.iterator]() {
    return {
      current: this.min,
      max: this.max,
      next () {
        if(this.current === this.max) {
          return {
            value: undefined,
            done: true,
          }
        } else {
          return {
            value: this.current++,
            done: false,
          }
        }
      }
    }
  }
}

for(let value of obj2) {
  console.log(value)
}
