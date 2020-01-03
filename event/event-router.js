const router = require('express').Router();
const bcrypt = require('bcryptjs');

const restricted = require('../auth/authenticate-middleware.js');
const generateToken = require('../auth/generateToken.js');
const Event = require('./event-helpers');

// root test endpoint
router.get('/', (req, res) => {
    Event.find()
        .then(event => {
            res.json(event);
        })
        .catch(error => {
            res.status(404).json(error);
        })
})

// Make an Endpoint for the google api that feeds the {ID, EventName, EventLocation(with string address and the lang and longatute)}
router.get('/location', (req, res) => {
    Event.findLocation()
        .then(location => {
            res.json(location)
        })
        .catch(error => {
            res.status(404).json(error)
        })
})
// An Endpoint for all Event Data

// An Endpoint that gives shows Admin Active Events

// An Endpoint that gives shows Player Active Events



module.exports = router;
