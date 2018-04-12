const express = require('express')
const next    = require('next')
const settings = require('./settings')
const api       = require('./api/api')

const dev = process.env.NODE_ENV !== 'production';
const app = next({dev})
const handle = app.getRequestHandler()

const start = async () => {
  try {
    const server = express()
    await api.start(server, settings)
    await app.prepare()
    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    await server.listen(settings.port)
    console.log(`> Ready on ${settings.url}:${settings.port}`)
  } catch (ex) {
    console.error(ex)
    process.exit(1)
  }
}
start()
/* for reference 
app.prepare()
  .then(() => {
    const server = express();
  
    // Setup mongo for ooth
    const oothMongo = new OothMongo(db, ObjectId)
    server.get('/p/:id', (req, res) => {
      const actualPage = '/post'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })
    server.get('*', (req, res) => {
      return handle(req, res)
    })
    server.listen(3000, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })
  */