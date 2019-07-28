/**
 * Import
 */

const mongoose = require('mongoose')

/**
 * Configuration
 */

const dbConnect = () => {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      process.env.MONGO_URL,
      { useNewUrlParser: true }
    )
    .then(db => resolve(process.env.MONGO_URL))
    .catch(err => reject(err))
  })
}

/**
 * Export
 */

module.exports = dbConnect
