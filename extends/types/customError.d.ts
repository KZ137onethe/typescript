/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />

declare module "CustomError" {
  interface DefParams {
    name: string,
    message: string,
    timestamp: Date,
    toString(): string,
  }
  type ApiParams = DefParams & { readonly code: number }
  const Def: new (message: string) => DefParams
  const Api: new (message: string, code: number) => ApiParams
  export default Def
  export {
    Api,
    Def
  }
}
