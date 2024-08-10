declare module "express" {
  interface App {
    use(path: string, router: any): void
    listen(port: number, callback: () => void)
  }
  interface Express {
    (): App,
    Router(): Router
  }

  interface Router{
    get(path: string, callback: (req: any, res: any) => void): void
  }

  const express: Express

  export default express
}

// 通过 declare 来扩充全局变量
declare var abc: number;
declare function xxx(params: string): void;
declare class Angular {}
declare enum C {
  a = 1,
}