const router = require('express').Router();

const restricted = require('../auth/authenticate-middleware.js');
const Event = require('./event-helpers');

// Endpoint for the google api that returns the ['id', 'name', 'location', 'lat', 'lng']
router.get('/location', (req, res) => {
    Event.findLocation()
        .then(location => {
            res.json(location);
        })
        .catch(error => {
            res.status(404).json(error);
        });
});

// An Endpoint for all Event Data, without playerList or Admin List
router.get('/', (req, res) => {
    Event.find()
        .then(event => {
            res.json(event);
        })
        .catch(error => {
            res.status(404).json(error);
        });
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    Event.findByEventId(id)
        .then(event => {
            res.status(201).json(event);
        })
        .catch(error => {
            res.status(404).json({ message: 'It is done broken man :id' });
        });
});

// An Endpoint for adding a new Event, it requires the ID of the user creating it
router.post('/:id', (req, res) => {
    const { id } = req.params;

    Event.add(req.body)
        .then(saved => {
            res.status(201).json({ message: 'New Event created!' });
            let admin;
            admin.event_id = saved.id;
            admin.user_id = { id };
            Event.addAdmin(admin)
                .then(saved => {
                    res.status(201).json(saved);
                })
                .catch(error => {
                    res.status(400).json({ message: 'It broke' });
                });
        })
        .catch(error => {
            res
                .status(400)
                .json({ message: 'Invalid Registration, please try again.' });
        });
});

// An Endpoint that gives shows Admin Active Events
router.get('/admin/:id', (req, res) => {
    const { id } = req.params;
    // This should grab all event_ids from an
    // admin and display all of their events that they are Admin for
    console.log(id);
    Event.findByAdminId(id)
        .then(event_id => {
            let temp = event_id.map(e => {
                Event.findByEventId(e.event_id)
                    .then(events => {
                        return events;
                    })
            })
            res.status(201).json(temp)
            console.log(event_id);
        })
        .catch(error => {
            res.status(404).json({ message: 'user_id for admin not found' });
        });
});

// An Endpoint that gives shows Player Active Events
router.get('/player/:id', (req, res) => {
    const { id } = req.params;
    // This should grab all event_ids from a
    // player and display all of their events that they are a player for
    Event.findByPlayerId(id)
        .then(event_id => {
            Event.findByEventId(event_id)
                .then(events => {
                    res.json(events);
                })
                .catch(error => {
                    res.status(404).json({ message: 'event_id not found' });
                });
        })
        .catch(error => {
            res.status(404).json({ message: 'user_id for admin not found' });
        });
});

module.exports = router;
