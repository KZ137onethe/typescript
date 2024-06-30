function visitDecorator(target: any, key: string, descriptor: PropertyDescriptor) {
  // descriptor.writable = false;
}

class TestFive {
  constructor(private _name: string) {}

  get name(){
    return this._name;
  }

  @visitDecorator
  set name(name: string) {
    this._name = name;
  }
}

const test5 = new TestFive("Mary");
test5.name = "mary";
console.log(test5.name);


