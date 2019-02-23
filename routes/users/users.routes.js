/**
 * Import
 */

const express     = require('express');
const usersRouter = express.Router();

const { fetch } = require('./users.ctrl');

/**
 * Definition
 */

class UsersRouterClass {
  constructor() {}

  routes() {
    usersRouter.post('/', (request, response) => {
      if (typeof request.body === undefined || request.body === null) {
        return response.json({ msg: 'No body data provided', data: null });
      } else {
        fetch(request.body, response)
        .then(apiResponse => response.json({ msg: 'Contacts fetched', success: true, data: apiResponse }))
        .catch(apiResponse => response.json({ msg: 'Contacts not fetched', success: false, data: apiResponse }));
      }
    });
  }

  init() {
    this.routes();
    return usersRouter;
  }
};

/**
 * Export
 */

module.exports = UsersRouterClass;
