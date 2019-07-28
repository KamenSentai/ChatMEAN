/**
 * Imports
 */

const bcrypt = require('bcrypt')

const UserModel = require('../../models/user.model')

/**
 * Methods
 */

const createItem = body => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email: body.email }, (error, user) => {
      if (error) return reject(error)
      else if (user) return reject('User already registered')
      else {
        bcrypt.hash(body.password, 10)
        .then(hashedPassword => {
          body.password = hashedPassword

          UserModel.create(body)
          .then(mongoResponse => resolve(mongoResponse))
          .catch(mongoResponse => reject(mongoResponse))
        })
        .catch(hashError => reject(hashError))
      }
    })
  })
}

const readItem = () => {

}

const updatetem = () => {

}

const deleteItem = () => {

}

/**
 * Export
 */

module.exports = {
  createItem,
  readItem,
  updatetem,
  deleteItem
}
