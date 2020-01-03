const router = require('express').Router();
const bcrypt = require('bcryptjs');

const restricted = require('../auth/authenticate-middleware.js');
const generateToken = require('../auth/generateToken.js');
const Event = require('./event-helpers');

// Make an Endpoint for the google api that feeds the {ID, EventName, EventLocation(with string address and the lang and longatute)}

module.exports = router;
