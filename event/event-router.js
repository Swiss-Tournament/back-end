const router = require('express').Router();
const bcrypt = require('bcryptjs');

const restricted = require('../auth/authenticate-middleware.js');
const generateToken = require('../auth/generateToken.js');
const Event = require('./event-helpers');

module.exports = router;
