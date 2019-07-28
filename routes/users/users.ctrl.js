/**
 * Import
 */

const UserModel = require('../../models/user.model')

/**
 * Method
 */

const fetch = (body, response) => {
  return new Promise((resolve, reject) => {
    UserModel.find({}, (error, users) => {
      let usersFound = []

      if (error) return reject(error)
      else {
        users.forEach(user => {
          usersFound.push(user)
        })

        return resolve(usersFound)
      }
    })
  })
}

/**
 * Export
 */

module.exports = {
  fetch
}
