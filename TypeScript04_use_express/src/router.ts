import { Router, Response, Request, NextFunction } from "express"
import path from "path"
import fs from "fs"
import Analyzer from "./utils/analyzer"
import Crowller from "./utils/crowller"
import { getResponseData } from "./utils/utils"

interface BodyRequest extends Request {
  body: {
    [key: string]: string | undefined;
  }
}

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  const isLogin = req.session?.login;
  if(isLogin) {
    next();
  } else {
    res.json(getResponseData(null, "请先登录"))
  }
}

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const isLogin = req.session?.login;
  if(isLogin) {
    res.send(
      `
        <html>
          <body>
            <a href="/getData">爬取内容</a>
            <a href="/showData">展示爬取内容</a>
            <a href="/logout">退出</a>
          </body>
        </html>
      `
    )
  } else {
    res.send(
      `
        <html>
          <body>
            <form method="post" action="/login">
              <input type="password" name="password">
              <button>登录</button>
            </form>
          </body>
        </html>
      `
    );
  }
})

router.post("/login", (req: BodyRequest, res: Response) => {
  const { password } = req.body;
  const isLogin = req.session?.login;

  if(isLogin) {
    res.json(getResponseData(false, "已登录"))
  } else {
    if(password === "123") {
      if(req.session) {
        req.session.login = true;
        // res.send("登录成功");
        res.json(getResponseData(true))
      }
    } else {
      // res.send("登录失败")
      res.json(getResponseData(false, "登录失败"))
    }
  }
})

router.get("/logout", (req: BodyRequest, res: Response) => {
  if(req.session) {
    req.session.login = undefined;
  }
  res.redirect("/");
})

router.get("/getData", checkLogin, (req: BodyRequest, res: Response) => {
    const secret = "secretKey";
    const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;
    const analyzer = Analyzer.getInstance();
    const crowller = new Crowller(analyzer);
    res.json(getResponseData(true))
})

router.get("/showData", checkLogin, (req: BodyRequest, res: Response) => {
    try {
      const position = path.resolve(__dirname, "../data/course.json");
      const fileContent = fs.readFileSync(position, "utf-8")
      res.json(getResponseData(JSON.parse(fileContent)));
    } catch(e) {
      res.json(getResponseData(false, "数据不存在"))
    }
})

export default router;