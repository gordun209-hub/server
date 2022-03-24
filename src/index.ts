import express, { Application, Request, Response } from 'express'

// Boot express
const app: Application = express()
const port = 5000

// Application routing
app.use('/', (request: Request, res: Response) => {
  res.status(200).send({ data: 'as' })
})
// Start server

app.listen(port, () => console.log(`Server is listening on port ${port}!`))
