/**
 * 5. <amd-module /> amd-module 指令允许将可选模块名称传递给编译器
 */
/// <amd-module name="other" />

import { greet } from "./utils"

console.log("Other Module Loaded!")
greet("World")
