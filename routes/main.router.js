/**
 * Import
 */

const { Router } = require('express');

const AuthRouterClass = require('./auth/auth.routes');
const FrontRouterClass = require('./front/front.routes');
const PostRouterClass = require('./post/post.routes');
const UserRouterClass = require('./user/user.routes');

/**
 * Router
 */

const mainRouter = Router();
const apiRouter = Router();

const authRouter = new AuthRouterClass();
const frontRouter = new FrontRouterClass();
const postRouter = new PostRouterClass();
const userRouter = new UserRouterClass();

/**
 * Routes
 */

mainRouter.use('/api', apiRouter);
apiRouter.use('/auth', authRouter.init());
apiRouter.use('/post', postRouter.init());
apiRouter.use('/user', userRouter.init());
mainRouter.use('/', frontRouter.init());

/**
 * Export
 */

module.exports = mainRouter;
