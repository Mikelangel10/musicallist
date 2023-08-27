import app from './src/app.js'
import connect from './src/db.js'

const port = app.get('port')

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`)

  connect(process.env.URI ?? '')
})
