// 这个爬虫的分析器是固定的，这里将他变成一个单例模式
import fs from "fs"
import cheerio from "cheerio"

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number,
  courseInfo: Course[]
}

interface JsonContent {
  [prop: number]: Course[]
}

export interface AnalyzerType {
  analyze(html: string, filePath: string): string;
}

export default class Analyzer implements AnalyzerType {
  private static instance: AnalyzerType;

  static getInstance() {
    if(!Analyzer.instance) {
      Analyzer.instance = new Analyzer();
    }
    return Analyzer.instance;
  }

  private constructor() {}

  public analyze(html: string, filePath: string) {
    const courseData = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseData, filePath);

    return JSON.stringify(fileContent);
  }

  private getCourseInfo(html: string) {
    const $ = cheerio.load(html);
    const courseItems = $("div.course-item");
    const result: CourseResult = {
      time: 0,
      courseInfo: []
    }
    courseItems.map((idx, element) => {
      const desc = $(element).find("p.course-desc");
      const title = desc.eq(0).text();
      const count = parseInt(desc.eq(1).text().split("：")[1]);
      result.time = (new Date()).getTime();
      result.courseInfo.push({ title, count })
    })

    return result;
  }

  private generateJsonContent(courseData: CourseResult, filePath: string) {
    let fileContent: JsonContent = {}
    if(fs.existsSync(filePath)) {
      fileContent = JSON.parse(fs.readFileSync(filePath, "utf-8") || "{}")
    }
    fileContent[courseData.time] = courseData.courseInfo;
    return fileContent;
  }
}