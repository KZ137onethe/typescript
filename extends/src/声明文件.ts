import express from "express"

// express 默认是没有声明文件的，这里我们手写一个声明文件 types/express.d.ts
// 默认情况下，我们从社区的 "@types/express" 来扩充express全局声明文件

const app = express()
const router = express.Router()

app.use('/api', () => router)
router.get('/api', (_: any, res: any) => {
  res.json({
    code: 200
  })
})

app.listen(9001, () => {
  console.log('9001')
})
