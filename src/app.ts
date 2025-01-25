import express, { Request, Response } from 'express'
import 'express-async-errors'
import { routes } from './routes'

const app = express()
app.use(express.json())
app.use(routes)

export { app }