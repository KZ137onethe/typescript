// 原型，方法名，参数所在位置
function paramDecorator(target: any, method: string, paramIndex: number) {
  console.log(target, method, paramIndex);
}


class TestSeven {
  getInfo(@paramDecorator name: string,@paramDecorator age: number) {
    console.log(name, age);
  }
}