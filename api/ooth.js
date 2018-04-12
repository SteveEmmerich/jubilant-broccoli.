/* Settup Ooth authentication */

const Ooth = require('ooth')
const oothLocal = require('ooth-local')
const {MongoClient, ObjectId} = require('mongodb')
const OothMongo = require('ooth-mongo')
const oothProfile = require('ooth-profile')
const oothRoles = require('ooth-roles')
const userSchema = require('./schema/user')

const start = async (app, settings) => {
  const ooth = new Ooth({
    sharedSecret: settings.sharedSecret,
    path: settings.oothPath
  })
  const client = await MongoClient.connect(settings.mongoUrl)
 
  const oothMongo = new OothMongo(client.db(), ObjectId)
  ooth.use('profile', oothProfile(userSchema))
  ooth.use('roles', oothRoles())
  await ooth.start(app, oothMongo)

  ooth.use('local', oothLocal({
    onRegister() {},
    onGernerateVerificationToken() {},
    onSetEmail() {},
    onVerify() {},
    onForgotPassword() {},
    onResetPassword() {},
    onChangePassword() {}}))
}
module.exports = {
  start
}