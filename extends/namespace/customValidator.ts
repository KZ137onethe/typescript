export namespace customValidator {
  interface StringValidator {
    isAcceptable(s: string): boolean
  }
  export class ZipCodeValidator implements StringValidator {
    static checkRegExp =  /^[0-9]{5}$/
    isAcceptable(s: string) {
      return ZipCodeValidator.checkRegExp.test(s);
    }
  }
}