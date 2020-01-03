const router = require('express').Router();
const bcrypt = require('bcryptjs');

const restricted = require('../auth/authenticate-middleware.js');
const generateToken = require('../auth/generateToken.js');
const Event = require('./event-helpers');

// Endpoint for the google api that returns the ['id', 'name', 'location', 'lat', 'lng']
router.get('/location', (req, res) => {
    Event.findLocation()
        .then(location => {
            res.json(location)
        })
        .catch(error => {
            res.status(404).json(error)
        })
})

// An Endpoint for all Event Data, without playerList or Admin List
router.get('/', (req, res) => {
    Event.find()
        .then(event => {
            res.json(event);
        })
        .catch(error => {
            res.status(404).json(error);
        })
})

// An Endpoint that gives shows Admin Active Events
router.get('/admin/:id', (req, res) => {
    let { id } = req.params;
    // This should grab all event_ids from an 
    // admin and display all of their events that they are Admin for
    Event.findByAdminId(id)
        .then(event_id => {
            Event.findByEventId(event_id)
                .then(events => {
                    res.json(events)
                })
                .catch(error => {
                    res.status(404).json({ message: 'event_id not found' })
                })
        })
        .catch(error => {
            res.status(404).json({ message: 'user_id for admin not found' });
        })
})

// An Endpoint that gives shows Player Active Events
router.get('/player/:id', (req, res) => {
    let { id } = req.params;
    // This should grab all event_ids from a 
    // player and display all of their events that they are a player for
    Event.findByPlayerId(id)
        .then(event_id => {
            Event.findByEventId(event_id)
                .then(events => {
                    res.json(events)
                })
                .catch(error => {
                    res.status(404).json({ message: 'event_id not found' })
                })
        })
        .catch(error => {
            res.status(404).json({ message: 'user_id for admin not found' });
        })
})


module.exports = router;
