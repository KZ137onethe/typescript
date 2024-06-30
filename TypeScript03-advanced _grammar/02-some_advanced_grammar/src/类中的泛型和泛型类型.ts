interface Item {
  name: string,
}


class DataManager<T extends Item> {
  constructor(private data: T[]) {}
  getItem(index: number): string {
    return this.data[index].name;
  }
}

const data = new DataManager([
  {
    name: "John",
  }
])

console.log(data.getItem(0));

// 指定泛型只能为 number 或者 string 类型
class DataManagerTwo<T extends number | string> {
  constructor(private data: T[]) {}
  getItem(index: number): T {
    return this.data[index];
  }
}

const data2 = new DataManagerTwo(["a", "b", "c"])
const data2_2 = new DataManagerTwo<number>([1, 2, 3])

// 如何使用泛型作为一个具体的类型注解
function hello<T>(params: T) {
  return params;
}

const func: <T>(params: T) => T = hello;