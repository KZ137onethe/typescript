
function testDecoratorTwo<T extends new (...args: any[]) => {}>(constructor: T) {
  return class extends constructor {
    name!: string;
    getName() {
      return this.name;
    }
  }
}

@testDecoratorTwo
class TestTwo {
  constructor(public name: string) {}
}

function testDecoratorThree() {
  return function<T extends new (...args: any[]) => any>(constructor: T) {
    return class extends constructor {
      name = "lee";
      getName() {
        return this.name;
      }
    }
  }
}

const TestThree = testDecoratorThree()(
  class {
    name: string;
    constructor(name: string) {
      this.name = name;
    }
  }
)


const test2 = new TestTwo("ok");
const test3 = new TestThree("dell");
console.log((test2 as any).getName());
console.log(test3.getName());
