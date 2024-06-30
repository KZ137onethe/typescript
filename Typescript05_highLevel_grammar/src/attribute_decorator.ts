// 修改的并不是示例上的 name, 而是原型上的 name
function nameDecorator(target: any, key: string): any {
  target[key] = 'b';
}

// name 是放在属性上的
class TestSix {
  @nameDecorator
  name = "a"
}

const test6 = new TestSix();
console.log(test6.name, (test6 as any).__proto__.name);
