const session = require('express-session')
require('dotenv').config();

const ProcessSession = session({
  secret: process.env.SECRET_KEY,
  // store: new FileStore(), // use it as your store
  resave: true,
  saveUninitialized: true,
  cookie: {
      maxAge: 28800000 // 8 Hour
  },
})

module.exports = {ProcessSession}