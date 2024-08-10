// 动态类型
function fn1(a: number, b: number): Array<number> {
  return [a, b]
}

function fn2(a: string, b: string): Array<string> {
  return [a, b]
}

// fn1 和 fn2 可以重写为 fn
function fn<T>(a: T, b: T): Array<T> {
  return [a, b]
}

fn(1, 2)

// 通过类型别名定义泛型
type A<T> = number | string | T
let a_1: A<boolean> = false
a_1 = 123

// 使用多个泛型
function add<T, K>(a: T, b: K): Array<T | K> {
  return [a, b]
}

add(false, 1)

//TODO: XMLHttpRequest defined!
const axios = {
  get<T>(url: string) {
    return new Promise((resolve, reject) => {
      let xhr: XMLHttpRequest = new XMLHttpRequest()
      xhr.open("GET", url)
      xhr.onreadystatechange = () => {
        if(xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText))
        }
      }
      xhr.send(null)
    })
  }
}

interface Data {
  message: string,
  age: number
}

axios.get<Data>('./data.json').then(res => {
  console.log(res)
})
