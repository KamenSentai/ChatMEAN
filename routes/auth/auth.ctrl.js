/**
 * Imports
 */

const bcrypt = require('bcrypt');

const UserModel = require('../../models/user.model');

/**
 * Methods
 */

const register = (body) => {
  return new Promise((resolve, reject) => {
  });
};

const login = (body, response) => {
  return new Promise((resolve, reject) => {
    UserModel.findOne({ email: body.email }, (error, user) => {
      if (error) return reject(error);
      else if (!user) return reject('Unknown user');
      else {
        const validPassword = bcrypt.compareSync(body.password, user.password);

        if (!validPassword) reject('Password not valid');
        else {
          response.cookie('ChatMEAN', user.generateJwt());

          return resolve(user);
        }
      }
    });
  });
};

/**
 * Export
 */

module.exports = {
  register,
  login
};
