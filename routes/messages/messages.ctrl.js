/**
 * Import
 */

const MessageModel = require('../../models/message.model');

/**
 * Methods
 */

const createItem = (body) => {
  return new Promise((resolve, reject) => {
    if (Object.entries(body).length !== 0 && body.constructor === Object) {
      MessageModel.create(body)
      .then(mongoResponse => resolve(mongoResponse))
      .catch(mongoResponse => reject(mongoResponse));
    }
  });
};

const readItem = (body) => {
  return new Promise((resolve, reject) => {
    MessageModel.find({}, (error, messages) => {
      let messagesFound = [];

      if (error) return reject(error);
      else {
        messages.forEach((message) => {
          messagesFound.push(message);
        });

        return resolve(messagesFound);
      }
    })
  });
};

/**
 * Export
 */

module.exports = {
  createItem,
  readItem
};
