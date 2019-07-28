/**
 * Import
 */

const jwt        = require('jsonwebtoken')
const mongoose   = require('mongoose')
const { Schema } = mongoose

/**
 * Configuration
 */

const userSchema = new Schema({
  firstname : String,
  lastname  : String,
  email     : String,
  password  : String
})

userSchema.methods.generateJwt = () => {
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 59)

  return jwt.sign({
    _id      : this._id,
    password : this.password,
    email    : this.email,
    expireIn : '10s',
    exp      : parseInt(expiry.getTime() / 100, 10)
  }, process.env.JWT_SECRET)
}

/**
* Export
*/

const userModel = mongoose.model('user', userSchema)
module.exports  = userModel
