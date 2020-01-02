const router = require('express').Router();
const bcrypt = require('bcryptjs');
const validator = require('../auth/authentication-validators');

const restricted = require('../auth/authenticate-middleware.js');
const generateToken = require('../auth/generateToken.js');
const Users = require('./auth-helpers.js');

/**
 * @apiDefine UserNotFound
 * @apiError UserNotFound Email is not in the system
 */

/**
 * @apiDefine NotAuthorized
 * @apiError NotAuthorized User is not authorized
 */

/**
 * @apiDefine EmailAlreadyTaken
 * @apiError EmailAlreadyTaken Email is already taken
 * @apiErrorExample {json} Email-Already-Taken
 * {
 *     "message": "Email is already taken"
 * }
 */

/**
 * @apiDefine UserNameAlreadyTaken
 * @apiError UserNameAlreadyTaken Username is already taken
 * @apiErrorExample {json} Username-Already-Taken
 * {
 *     "message": "Username is already taken"
 * }
 */

/**
 * @apiDefine RegisterFieldsRequired
 * @apiError RegisterValidationFail Fields are required
 * @apiErrorExample {json} Register-Fields-Required
 * {
 *     "message": "Email, username, and password are required"
 * }
 */

// Show all Users
router.get('/', restricted, (req, res) => {
  Users.find()
    .then(users => {
      res.status(201).json(users);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// Show one User by ID
router.get('/:id', restricted, (req, res) => {
  const { id } = req.params;

  Users.findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// Allows you to change Password, but only while logged in.
router.put('/update/:id', restricted, (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;

  Users.findById(id)
    .then(user => {
      console.log(user);
      if (user.username === updatedUser.username) {
        // Checks that username isn't being changed

        const hash = bcrypt.hashSync(updatedUser.password, 8); // hashes new password
        updatedUser.password = hash; // sets it over the one sent through the body

        Users.update(id, updatedUser)
          .then(updated => {
            res.status(201).json(updated);
          })
          .catch(error => {
            res.status(400).json(error);
          });
      } else {
        res.status(403).json({ message: 'You cannot change the username.' });
      }
    })
    .catch(err => {
      res.status(404).json({ message: 'User not found.' });
    });
});

// Delete A User
router.delete('/delete/:id', restricted, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(event => {
      if (event) {
        res.status(204).json({ message: `User ID:${id} removed` });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(err => {
      res.status(401).json({ error: 'The user could not be removed.' });
    });
});

// Register a New User

/**
 * @api {post} /api/auth/register Registers a new user
 * @apiUse UserNameAlreadyTaken
 * @apiUse EmailAlreadyTaken
 * @apiUse RegisterFieldsRequired
 * @apiVersion 1.0.0
 * @apiName RegisterUser
 * @apiGroup Auth
 * @apiPermission none
 * @apiDescription Registers a new user
 * @apiParam {String} email The New Users email *Required, *Unique
 * @apiParam {String} username The New Users username *Required, *Unique
 * @apiParam {String} password The New Users password *Required
 * @apiParam {String} location The New Users location *Optional
 * @apiParamExample {json} Sample Request
 * {
 *     "email": "mtgtourney@mtg.com",
 *     "username": "mtgtourney",
 *     "password": "supersecretpassword"
 * }
 * @apiParamSuccess {Object} message Welcome message and token for the new user
 * {
 *     "message": "Welcome mtgtourney"
 *     "token":
 * }
 *
 */

router.post('/register', validator.register, (req, res) => {
  // implement registration
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  Users.add(req.body)
    .then(saved => {
      const message = `Welcome ${saved.username}`;
      const token = generateToken(saved);
      res.status(201).json({ message, token });
    })
    .catch(error => {
      res
        .status(400)
        .json({ message: 'Invalid Registration, please try again.' });
    });
});

// Login with an existing User
router.post('/login', validator.login, (req, res) => {
  // implement login
  let { email, password } = req.body;
  console.log('email and password', email, password);
  email = email.toLowerCase();
  console.log('email lowcase', email);
  Users.findBy({ email })
    .first()
    .then(user => {
      console.log('This is the user', user);
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        user.token = token;
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      console.log('this is the err at the end 117', err);
    });
});

module.exports = router;
