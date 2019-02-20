/**
 * Import
 */

const express = require('express');
const authRouter = express.Router();

const checkFields = require('../../services/request.checker');
const { register, login } = require('./auth.ctrl');

/**
 * Definition
 */

class AuthRouterClass {
  constructor() { }

  routes() {
    authRouter.put('/register', (request, response) => {
      response.json({ msg: 'Register user' });
    });

    authRouter.post('/login', (request, response) => {
      if (typeof request.body === undefined || request.body === null) {
        return response.json({ msg: 'No body data provided', data: null });
      }

      const { success, extra, miss } =  checkFields(['password', 'email'], request.body);

      if (!success) response.json({ msg: 'Bad fiels provided', data: { miss: miss, extra: extra } });
      else {
        login(request.body, response)
        .then(apiResponse => response.json({ msg: 'User logged', success: true, data: apiResponse }))
        .catch(apiResponse => response.json({ msg: 'User not logged', success: false, data: apiResponse }));
      }
    });
  }

  init() {
    this.routes();
    return authRouter;
  }
}

/**
 * Export
 */

module.exports = AuthRouterClass;
