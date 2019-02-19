/**
 * Import
 */

const express = require('express');
const frontRouter = express.Router();

/**
 * Definition
 */

class FrontRouterClass {
  constructor() {

  }

  routes() {
    frontRouter.get('/*', (request, response) => {
      response.render('index');
    });
  }

  init() {
    this.routes();
    return frontRouter;
  }
}

/**
 * Export
 */

module.exports = FrontRouterClass;
