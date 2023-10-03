import express from 'express'
import dotenv from 'dotenv'
import routes from './routes/index.js'

dotenv.config()

const app = express()
app.disable('x-powered-by')

app.use(express.json())

app.set('port', process.env.PORT)

app.use('/api', routes)

export default app
