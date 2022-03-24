import cors from 'cors'
import express, { Application } from 'express'

const app: Application = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

export default app
