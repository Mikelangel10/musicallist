import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connect from './db.js'
import routes from './routes/index.js'

const app = express()
app.disable('x-powered-by')

app.use(express.json())

connect(process.env.URI ?? '')

app.set('port', process.env.PORT)

app.use('/api', routes)

app.use((req, res) => res.status(404).send({ message: 'Page not found' }))

export default app
