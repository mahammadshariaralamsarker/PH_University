import cors from 'cors'
import express, { Application } from 'express'

const app:Application = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
// Application Routes

// 
export default app;