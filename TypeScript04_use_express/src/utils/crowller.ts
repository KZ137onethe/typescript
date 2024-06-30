import fs from "fs"
import path from "path"
import superagent from "superagent"
import Analyzer, { AnalyzerType } from "./analyzer";

export default class Crowller {
  private secret = "secretKey";
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private rawHtml: string | undefined;
  private filePath = path.resolve(__dirname, "../../data/course.json");

  async getRawHtml() {
    const result = await superagent.get(this.url);
    this.rawHtml = result.text;
    return result.text;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }

  async initSpiderProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent)
  }

  constructor(private analyzer: AnalyzerType) {
    this.initSpiderProcess();
  }
}

// const secret = "secretKey";
// const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

// const analyzer = Analyzer.getInstance();
// const crowller = new Crowller(analyzer);