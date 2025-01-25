import express, { Request, Response } from 'express'
import 'express-async-errors'

const app = express()
app.use(express.json())

app.get('/', async (req: Request, res: Response) => {
    res.json({ message: 'ok' })
})

export { app }