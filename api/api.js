const session = require('express-session')
const {MongoClient, ObjectId} = require('mongodb')
const ooth    = require('./ooth')
const resolvers  = require('./schema/resolvers')
const {graphqlExpress, graphiqlExpress} = require('graphql-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const start = async (app, settings) => {
  let client;
  try {
    client = await MongoClient.connect(settings.mongoUrl);
    const corsMiddleware = cors({
      origin: settings.originUrl,
      credentials: true,
      preflightContinue: false
    })
    app.use(corsMiddleware)
    app.options(corsMiddleware)
    app.use(session({
      name: 'api-session-id',
      secret: settings.sessionSecret,
      resave: false,
      saveUninitialized: true
    }))
    await ooth.start(app, settings)
    const schema = resolvers(client.db())
    console.log(schema)
    app.use('/graphql', bodyParser.json(), graphqlExpress((req, res) => {
      return {
        schema,
        context: { userId: req.user && req.user._id }
      }
    }))
    app.use('/graphiql', graphiqlExpress({
      endpointUrl: '/graphql'
    }))
    app.get('/v1/users', async (req, res) => {
      console.log('v1/users hit.')
      const Users = client.db().collection('users')
    
      if (req.user) {
        let queriedUsers = await Users.find({}, {sort: {createdAt: -1}}).toArray()
        res.send({data: queriedUsers})
      }
      res.send({status: 500})
    })
  } catch (ex) {
    if(client) {
      client.close()
    }
    throw ex;
  }
}

module.exports = {
  start
}