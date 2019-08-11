/**
 * Imports
 */

const JwtStrategy = require('passport-jwt').Strategy
const UserModel = require('../models/user.model')

/**
 * Definition
 */

const cookieExtractor = request => {
  let token = null
  if (request && request.cookies) token = request.cookies[process.env.COOKIE_TOKEN]
  return token
}

const authJwt = passport => {
  const options = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: process.env.JWT_SECRET
  }

  passport.use(new JwtStrategy(options, (payload, done) => {
    UserModel.findOne({ _id: payload._id }, (error, user) => {
      if (error) done(error, false)
      if (user) done(null, user)
      else done(null, false)
    })
  }))
}

/**
 * Export
 */

module.exports = {
  setAuthentication: passport => {
    authJwt(passport)
  }
}
