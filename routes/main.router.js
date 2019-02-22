/**
 * Import
 */

const { Router } = require('express');

const AuthRouterClass = require('./auth/auth.routes');
const FrontRouterClass = require('./front/front.routes');
const PostRouterClass = require('./post/post.routes');
const UserRouterClass = require('./user/user.routes');
const UsersRouterClass = require('./users/users.routes');
const MessagesRouterClass = require('./messages/messages.routes');

/**
 * Router
 */

const mainRouter = Router();
const apiRouter = Router();

const authRouter = new AuthRouterClass();
const frontRouter = new FrontRouterClass();
const postRouter = new PostRouterClass();
const userRouter = new UserRouterClass();
const usersRouter = new UsersRouterClass();
const messagesRouter = new MessagesRouterClass();

/**
 * Routes
 */

mainRouter.use('/api', apiRouter);
apiRouter.use('/auth', authRouter.init());
apiRouter.use('/post', postRouter.init());
apiRouter.use('/user', userRouter.init());
apiRouter.use('/users', usersRouter.init());
apiRouter.use('/messages', messagesRouter.init());
mainRouter.use('/', frontRouter.init());

/**
 * Export
 */

module.exports = mainRouter;
