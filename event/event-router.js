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

// An Endpoint for Event Data
router.get('/:id', (req, res) => {
    const { id } = req.params;

    Event.findByEventId(id)
        .then(event => {
            let temp = {};

            temp.id = event.id;
            temp.location = {
                address: event.address,
                lat: event.lat,
                lng: event.lng
            };
            temp.public = event.public;
            temp.complete = event.complete;
            temp.date = event.date;
            temp.gameFormat = event.gameFormat;
            temp.eventNotes = event.eventNotes;
            temp.maxPlayers = event.maxPLayers;
            temp.roundEndTime = event.roundEndTime;
            temp.currentRound = event.currentRound;
            temp.maxRound = event.maxRound;
            temp.admins = [];
            temp.players = [{}];
            temp.scoreBoard = [];

            console.log('temp', temp)
            res.status(200).json(temp);
        })
        .catch(error => {
            res.status(404).json({ message: 'It is done broken man :id' });
        });
});

// An Endpoint that gives shows Admin Active Events
router.get('/admin/:id', (req, res) => {
    const { id } = req.params;
    // This should grab all event_ids from an
    // admin and display all of their events that they are Admin for
    console.log(id);
    Event.joinAdmin(id)
        .then(event => {
            res.status(200).json(event)
        })
        .catch(error => {
            res.status(400).json(error)
        })
});

// An Endpoint that gives shows Player Active Events
router.get('/player/:id', (req, res) => {
    const { id } = req.params;
    // This should grab all event_ids from a
    // player and display all of their events that they are a player for
    Event.joinPlayer(id)
        .then(event => {
            res.status(200).json(event)
        })
        .catch(error => {
            res.status(400).json(error)
        })
});


// An Endpoint for adding a new Event, it requires the ID of the user creating it
router.post('/:id', (req, res) => {
    const { id } = req.params;

    Event.addEvent(req.body)
        .then(saved => {
            let admin = {
                event_id: saved[0],
                user_id: id
            };
            Event.addAdmin(admin)
                .then(added => {
                    // Saved will have the event ID
                    // User ID comes from the id
                    res.status(201).json({ message: 'You made a connection' })
                })
                .catch(error => {
                    res.status(404).json({ message: 'Oh no it broke!' })
                })
        })
        .catch(error => {
            res
                .status(400)
                .json({ message: 'Invalid Registration, please try again.' });
        });
});


// An Endpoint that updates a current Event, it requires the event ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const what = 'events';

    Event.update(id, req.body, what)
        .then(updated => {
            res.status(204).json({ message: 'Event Updated!' });
        })
        .catch(error => {
            res
                .status(400)
                .json(error);
        });
});

// An Endpoint that deletes an event
router.delete('/:id', (req, res) => {
    let { id } = req.params;
    const what = 'events';

    Event.remove(id, what)
        .then(event => {
            if (event) {
                res.status(200).json({ message: `Event ID:${id} removed` })
            } else {
                res.status(404).json({ message: 'Kickstarter not found' })
            }
        })
        .catch(err => {
            res.status(500).json({ error: 'The Kickstarter could not be removed.' })
        })
});


module.exports = router;
