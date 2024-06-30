export class Header {
  constructor() {
    const element = document.createElement("header");
    element.innerText = "This is Header";
    document.body.appendChild(element);
  }
}

export class Content {
  constructor() {
    const element = document.createElement("main");
    element.innerText = "This is Content";
    document.body.appendChild(element);
  }
}

export class Footer {
  constructor() {
    const element = document.createElement("footer");
    element.innerText = "This is Footer";
    document.body.appendChild(element);
  }
}