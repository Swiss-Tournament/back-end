const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../users/auth-router.js');
const event = require('../event/event-router');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());
server.use(morgan('dev'));

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.use('/api/auth', authRouter);
server.use('/api/event', event, authenticate); // Removed authenticate for testing.

module.exports = server;
