
function testDecorator(constructor: any) {
  constructor.prototype.getName = () => {
    console.log("dell");
  }
}

@testDecorator
class TestOne {}

const test1 = new TestOne();
(test1 as any).getName();
