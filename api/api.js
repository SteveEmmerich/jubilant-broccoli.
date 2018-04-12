const session = require('express-session')
const {MongoClient, ObjectId} = require('mongodb')
const ooth    = require('./ooth')

const start = async (app, settings) => {
  let client;
  try {
    client = await MongoClient.connect(settings.mongoUrl);

    app.use(session({
      name: 'api-session-id',
      secret: settings.sessionSecret,
      resave: false,
      saveUninitialized: true
    }))
    await ooth.start(app, settings)


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