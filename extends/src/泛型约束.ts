function add1<T extends number>(a: T, b: T) {
  return a + b
}

add1(1, 2)

interface Len {
  length: number
}

function getLen<T extends Len>(a: T) {
  return a.length
}

getLen('123456')
getLen([2, 3, 5, 7, 11])

let obj = {
  name: "zhangsan",
  age: 18
}

function getObjAttrValue<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key]
}

getObjAttrValue(obj, 'age')

interface User {
  name: string,
  age: number,
  sex: number
}

type ObjOptions<T extends object> = {
  [Key in keyof T]?: T[Key]
}

type UserOptions = ObjOptions<User>