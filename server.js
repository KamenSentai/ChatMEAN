/**
 * Import
 */

require('dotenv').config();
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const http = require('http');
const socket = require('socket.io');
const cookieParser = require('cookie-parser');
const dbConnect = require('./services/mongodb.serv');
const mainRouter = require('./routes/main.router');

/**
 * Configuration
 */

const server = express();
const port = process.env.PORT;
const app = http.Server(server);
const io = socket(app);

// Socket.io connection
io.on('connection', (socket) => {
  console.log('Connected to Socket' + socket.id);

  socket.on('createItem', (message) => {
    console.log('socketData: '+ JSON.stringify(message));
  });

  socket.on('readItem', (message) => {
    console.log('socketData: '+ JSON.stringify(message));
  });
});

class ServerClass {
  init() {
    server.engine('html', ejs.renderFile);
    server.set('view engine', 'html');

    server.set('views', __dirname + '/www');
    server.use(express.static(path.join(__dirname, 'www')));

    server.use(bodyParser.json({limit: '10mb'}));
    server.use(bodyParser.urlencoded({extended: true}));

    server.use(cookieParser());

    server.use('/', mainRouter);

    this.launch();
  }

  launch() {
    dbConnect()
    .then(db => {
      server.listen(port, () => {
        console.log({
          mongo: `DB is connected ${db}`,
          server: `Server listening on port ${port}`
        });
      });
    })
    .catch(err => console.log(`Error MongoDB ${err}`));
  }
}

/**
 * Start server
 */

new ServerClass().init();
