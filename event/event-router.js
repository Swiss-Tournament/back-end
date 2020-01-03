const router = require('express').Router();

const restricted = require('../auth/authenticate-middleware.js');
const Event = require('./event-helpers');

// Endpoint for the google api that returns the ['id', 'name', 'location', 'lat', 'lng']

/**
 * @api {get} https://magic-the-gathering-tournament.herokuapp.com/api/auth/event/location Gets the location of events
 * @apiVersion 1.0.0
 * @apiName GetLocations
 * @apiGroup Events
 * @apiPermission token
 * @apiDescription Retrieves the current list of locations for events
 * @apiSuccess {Object} locations Returns all the locations of the current Events
 * @apiSuccessExample {json} Success-Response:
 * [
 *  {
 *     "id": 1,
 *     "date": "2020-03-14T17:00:00.000Z",
 *     "name": "Brenda's French Soul Food",
 *     "location": "652 Polk St, San Francisco, CA 94102",
 *     "lat": 37.786655,
 *     "lng": -122.41209
 *  },
 *  {
 *     "id": 2,
 *     "date": "2020-04-17T16:30:00.000Z",
 *     "name": "Mr. Holmes Bakehouse",
 *     "location": "1042 Larkin St, San Francisco, CA 94109",
 *     "lat": 37.787315,
 *     "lng": -122.41518
 *  },
 *  {
 *     "id": 3,
 *     "date": "2020-05-01T17:00:00.000Z",
 *     "name": "UC Hastings College of the Law",
 *     "location": "200 McAllister St, San Francisco, CA 94102",
 *     "lat": 37.781155,
 *     "lng": -122.41735
 *  },
 *  {
 *     "id": 4,
 *     "date": "2020-06-28T18:00:00.000Z",
 *     "name": "Lambda Headquarters",
 *     "location": "250 Montgomery St, San Francisco, CA 94104",
 *     "lat": 37.79168,
 *     "lng": -122.40235
 *  },
 *  {
 *     "id": 5,
 *     "date": "2020-07-14T22:00:00.000Z",
 *     "name": "Fogo de Chão Brazilian Steakhouse",
 *     "location": "201 S, 3rd St Suite 100, San Francisco, CA 94103",
 *     "lat": 37.784706,
 *     "lng": -122.406044
 *  },
 *  {
 *     "id": 6,
 *     "date": "2020-08-03T15:00:00.000Z",
 *     "name": "Don Pistos",
 *     "location": "510 Union St, San Francisco, CA 94133",
 *     "lat": 37.798477,
 *     "lng": -122.40553
 *  },
 *  {
 *     "id": 7,
 *     "date": "2020-10-01T18:00:00.000Z",
 *     "name": "All Star Donuts",
 *     "location": "399 5th St, San Francisco, CA 94107",
 *     "lat": 37.778866,
 *     "lng": -122.40281
 *  }
 * ]
 */

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

/**
 * @api {get} https://magic-the-gathering-tournament.herokuapp.com/api/event Gets all the events
 * @apiVersion 1.0.0
 * @apiName GetEvents
 * @apiGroup Events
 * @apiPermission token
 * @apiDescription Retrieves the current list of locations for events
 * @apiSuccess {Object} events Gets all the events
 * @apiSuccessExample {json} Success-Response:
 * [
 *  {
 *     "id": 1,
 *     "name": "Brenda's French Soul Food",
 *     "location": "652 Polk St, San Francisco, CA 94102",
 *     "lat": 37.786655,
 *     "lng": -122.41209,
 *     "public": true,
 *     "complete": false,
 *     "date": "2020-03-14T17:00:00.000Z",
 *     "gameFormat": "Standard",
 *     "eventNotes": null,
 *     "maxPlayers": null,
 *     "roundEndTime": null,
 *     "currentRound": null,
 *     "maxRounds": null
 *  },
 *  {
 *     "id": 2,
 *     "name": "Mr. Holmes Bakehouse",
 *     "location": "1042 Larkin St, San Francisco, CA 94109",
 *     "lat": 37.787315,
 *     "lng": -122.41518,
 *     "public": true,
 *     "complete": false,
 *     "date": "2020-04-17T16:30:00.000Z",
 *     "gameFormat": "Standard",
 *     "eventNotes": null,
 *     "maxPlayers": null,
 *     "roundEndTime": null,
 *     "currentRound": null,
 *     "maxRounds": null
 *  },
 *  {
 *     "id": 3,
 *     "name": "UC Hastings College of the Law",
 *     "location": "200 McAllister St, San Francisco, CA 94102",
 *     "lat": 37.781155,
 *     "lng": -122.41735,
 *     "public": true,
 *     "complete": false,
 *     "date": "2020-05-01T17:00:00.000Z",
 *     "gameFormat": "Standard",
 *     "eventNotes": null,
 *     "maxPlayers": null,
 *     "roundEndTime": null,
 *     "currentRound": null,
 *     "maxRounds": null
 *  },
 *  {
 *     "id": 4,
 *     "name": "Lambda Headquarters",
 *     "location": "250 Montgomery St, San Francisco, CA 94104",
 *     "lat": 37.79168,
 *     "lng": -122.40235,
 *     "public": true,
 *     "complete": false,
 *     "date": "2020-06-28T18:00:00.000Z",
 *     "gameFormat": "Standard",
 *     "eventNotes": null,
 *     "maxPlayers": null,
 *     "roundEndTime": null,
 *     "currentRound": null,
 *     "maxRounds": null
 *  },
 *  {
 *     "id": 5,
 *     "name": "Fogo de Chão Brazilian Steakhouse",
 *     "location": "201 S, 3rd St Suite 100, San Francisco, CA 94103",
 *     "lat": 37.784706,
 *     "lng": -122.406044,
 *     "public": true,
 *     "complete": false,
 *     "date": "2020-07-14T22:00:00.000Z",
 *     "gameFormat": "Standard",
 *     "eventNotes": null,
 *     "maxPlayers": null,
 *     "roundEndTime": null,
 *     "currentRound": null,
 *     "maxRounds": null
 *  },
 *  {
 *     "id": 6,
 *     "name": "Don Pistos",
 *     "location": "510 Union St, San Francisco, CA 94133",
 *     "lat": 37.798477,
 *     "lng": -122.40553,
 *     "public": true,
 *     "complete": false,
 *     "date": "2020-08-03T15:00:00.000Z",
 *     "gameFormat": "Standard",
 *     "eventNotes": null,
 *     "maxPlayers": null,
 *     "roundEndTime": null,
 *     "currentRound": null,
 *     "maxRounds": null
 *  },
 *  {
 *     "id": 7,
 *     "name": "All Star Donuts",
 *     "location": "399 5th St, San Francisco, CA 94107",
 *     "lat": 37.778866,
 *     "lng": -122.40281,
 *     "public": true,
 *     "complete": false,
 *     "date": "2020-10-01T18:00:00.000Z",
 *     "gameFormat": "Standard",
 *     "eventNotes": null,
 *     "maxPlayers": null,
 *     "roundEndTime": null,
 *     "currentRound": null,
 *     "maxRounds": null
 *  }
 * ]
 */

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
      const temp = {};


      temp.id = event.id;
      temp.location = {
                address: event.location,
        lat: event.lat,
        lng: event.lng,
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
            Event.findPlayers(id)
                .then(even => {
                    temp.players = even;
                })
                .catch(error => {
                    res.status(404).json({ message: 'It is broken inside of findPlayer' });
                })

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
      res.status(200).json(event);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// An Endpoint that gives shows Player Active Events
router.get('/player/:id', (req, res) => {
  const { id } = req.params;
  // This should grab all event_ids from a
  // player and display all of their events that they are a player for
  Event.joinPlayer(id)
    .then(event => {
      res.status(200).json(event);
    })
    .catch(error => {
      res.status(400).json(error);
    });
});

// An Endpoint for adding a new Event, it requires the ID of the user creating it
router.post('/:id', (req, res) => {
  const { id } = req.params;

  Event.addEvent(req.body)
    .then(saved => {
      const admin = {
        event_id: saved[0],
        user_id: id,
      };
      Event.addAdmin(admin)
        .then(added => {
          // Saved will have the event ID
          // User ID comes from the id
          res.status(201).json({ message: 'You made a connection' });
        })
        .catch(error => {
          res.status(404).json({ message: 'Oh no it broke!' });
        });
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
      res.status(400).json(error);
    });
});

// An Endpoint that deletes an event
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const what = 'events';

  Event.remove(id, what)
    .then(event => {
      if (event) {
        res.status(200).json({ message: `Event ID:${id} removed` });
      } else {
        res.status(404).json({ message: 'Kickstarter not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'The Kickstarter could not be removed.' });
    });
});

module.exports = router;
