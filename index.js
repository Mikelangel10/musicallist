import app from './src/app.js'
import mongoConnect from './src/db.js'

const port = app.get('port')

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`)

  mongoConnect(process.env.URI ?? '')
})
