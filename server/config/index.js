require('dotenv').config()

module.exports = {
  server: {
    host: process.env.HOST || '127.0.0.1',
    port: process.env.PORT || 3000,
  },
  mongodb: {
    dsn: process.env.MONGODB_DSN || 'mongodb://localhost/SportradarData'
  }
}