// 普通方法：target对应的是类的 prototype
// 静态方法：target对应的是类的 构造函数
// key 对应的是修饰方法的名字
// descriptor 要定义或修改的属性的描述符

function getNameDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  console.log(target, key);
  // descriptor.writable = false;
  descriptor.value = function() {
    return "decorator";
  }
}

class TestFour {
  name: string;
  constructor(name: string) {
    this.name = name;
  }

  @getNameDecorator
  getName() {
    return this.name;
  }
}

const test4 = new TestFour("tom");
console.log(test4.getName());
