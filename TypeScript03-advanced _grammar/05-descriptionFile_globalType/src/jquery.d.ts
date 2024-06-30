interface JqueryInstance {
  html: (html: string) => {}
}

// 方式1：定义全局变量
// declare var $: (param: () => void) => void;

// 方式2：定义全局函数
// 函数重载
declare function $(param: () => void): void;
declare function $(param: string): JqueryInstance;

// 方式3：使用interface的语法，实现函数重载
// interface JQuery {
//   (selector: string): JqueryInstance;
//   (readyFunc: () => void): void;
// }
// declare var $: JQuery;

// 如何对对象进行类型定义，以及对类进行类型定义，以及命名空间的嵌套
declare namespace $ {
  namespace fn {
    class init {}
  }
}