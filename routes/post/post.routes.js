/**
 * Import
 */

const express = require('express');
const postRouter = express.Router();

/**
 * Definition
 */

class PostRouterClass {
  constructor() { }

  routes() {
    postRouter.post('/', (request, response) => {
      response.json({ msg: 'Create post', req: request.body });
    });

    postRouter.get('/', (request, response) => {
      response.json({ msg: 'Read post' });
    });

    postRouter.put('/', (request, response) => {
      response.json({ msg: 'Update post' });
    });

    postRouter.delete('/', (request, response) => {
      response.json({ msg: 'Delete post' });
    });
  }

  init() {
    this.routes();
    return postRouter;
  }
}

/**
 * Export
 */

module.exports = PostRouterClass;
