export namespace API {
  export function getPetInfo() {
    let randomName = (function() {
      return Math.random() < 0.5 ? "swim" : "fly";
    })();
    return {
      [randomName]:() => {
        console.log(`this is ${randomName}`);
      }
    };
  }
}
