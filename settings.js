module.exports = {
  url: 'http://localhost',
  port: process.env.PORT || 80,
  originUrl: process.env.NODE_ENV == 'production' ? 'https://sdemmer.herokuapp.com/' : 'http://localhost:80',
  mongoUrl:'mongodb://example:password@ds241699.mlab.com:41699/mobi',//mongodb:localhost:32768/mobi',
  sharedSecret: 'XXX',
  sessionSecret: 'XXX',
  oothPath: '/auth',
}