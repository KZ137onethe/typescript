///<reference path='./components.ts'>

namespace Home {
  export class Page {
    constructor() {
      new Components.Header();
      new Components.Content();
      new Components.Footer();
    }

    user: Components.User = {
      name: "dell"
    }
  }
}