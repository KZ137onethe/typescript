// ES6 模块化

declare module "jquery" {
  interface JqueryInstance {
    html: (html: string) => {}
  }

  declare function $(readFunc: () => void): void;
  declare function $(selector: string): JqueryInstance;

  declare namespace $ {
    namespace fn {
      class init {}
    }
  }
  export = $; 
}