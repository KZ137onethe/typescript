class Def extends Error {
  public timestamp: Date;
  public name: string;
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name; // 设置错误名称为类名
    this.timestamp = new Date();
  }
  toString() {
    return `${this.name}: ${this.message} at ${this.timestamp}`;
  }
}

class Api extends Def {
  constructor(message: string,readonly code: number) {
    super(message);
    this.code = code
  }
  
  toString(): string {
    return `${this.name}: response code: ${this.code} ${this.message} at ${this.timestamp}`;
  }
}

export { Def, Api };
export default Def;
