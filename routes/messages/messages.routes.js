/**
 * Import
 */

const express    = require('express');
const authRouter = express.Router();

const { createItem, readItem } = require('./messages.ctrl');

/**
 * Definition
 */

class MessagesRouterClass {
  constructor() {}

  routes() {
    authRouter.post('/create', (request, response) => {
      createItem(request.body)
      .then(apiResponse => response.json({ msg: 'Message created', success: true, data: apiResponse }))
      .catch(apiResponse => response.json({ msg: 'Message not created', success: false, data: apiResponse }));
    });

    authRouter.post('/read', (request, response) => {
      readItem(request.body)
      .then(apiResponse => response.json({ msg: 'Messages read', success: true, data: apiResponse }))
      .catch(apiResponse => response.json({ msg: 'Messages not read', success: false, data: apiResponse }));
    });
  }

  init() {
    this.routes();
    return authRouter;
  }
};

/**
 * Export
 */

module.exports = MessagesRouterClass;
