// 4. <reference no-default-lib="true"/> 该指令将文件标记为默认库。
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />

class CustomError extends Error {
  public code: number;
  public timestamp: Date;

  constructor(message: string, code: number) {
      super(message);
      this.name = this.constructor.name; // 设置错误名称为类名
      this.code = code;
      this.timestamp = new Date();
  }

  toString() {
      return `${this.name} (code: ${this.code}): ${this.message} at ${this.timestamp}`;
  }
}

class APIError extends CustomError {
  constructor(message: string, code: number) {
      super(message, code);
  }
}

export { CustomError, APIError };

