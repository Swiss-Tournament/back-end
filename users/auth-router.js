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
 * @apiDefine InvalidEmailPassword
 * @apiError InvalidEmailPassword Invalid Username or Password
 * @apiErrorExample {json} Invalid-Email-Password
 * {
 *     "message": "Invalid Credentials"
 * }
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

/**
 * @apiDefine LoginFieldsRequired
 * @apiError LoginValidationFail Fields are required
 * @apiErrorExample {json} Login-Fields-Required
 * {
 *     "message": "Email and password are required"
 * }
 */

// Show logged in user

/**
 * @api {get} https://magic-the-gathering-tournament.herokuapp.com/api/auth/user Gets current user information
 * @apiVersion 1.0.0
 * @apiName GetUser
 * @apiGroup User
 * @apiPermission token
 * @apiDescription Retrieves the current login user based on the provided token
 * @apiSuccess {Object} user Returns the user information minus password
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "id": 9,
 *      "email": "Leonie_Hickle@gmail.com",
 *      "username": "Holly_Brown47",
 *      "location": null
 * }
 *
 */
router.get('/user', restricted, (req, res) => {
  const { id } = req.user;
  Users.findById(id)
    .then(user => {
      res.json(user);
    })
    .catch(error => {
      res.status(404).json(error);
    });
});

// Allows you to change Password, but only while logged in.

/**
 * @api {put} https://magic-the-gathering-tournament.herokuapp.com/api/auth/user Updates current user information
 * @apiUse UserNameAlreadyTaken
 * @apiUse EmailAlreadyTaken
 * @apiVersion 1.0.0
 * @apiName PutUser
 * @apiGroup User
 * @apiPermission token
 * @apiDescription Updates the current logged in user based on the provided token
 * @apiParam {String} email The New Users email *Optional
 * @apiParam {String} username The New Users username *Optional
 * @apiParam {String} password The New Users password *Optional
 * @apiParam {String} location The New Users location *Optional
 * @apiParamExample {json} Sample Request
 * {
 *     "password": "Not your momma password"
 * }
 * @apiSuccess {Object} user Returns the user information minus password
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "id": 9,
 *      "email": "Leonie_Hickle@gmail.com",
 *      "username": "Holly_Brown47",
 *      "location": null
 * }
 *
 */

router.put('/user', restricted, validator.update, (req, res) => {
  const { id } = req.user;
  const updatedUser = req.body;

  Users.findById(id)
    .then(user => {
      console.log(user);
      if (updatedUser.password) {
        const hash = bcrypt.hashSync(updatedUser.password, 8); // hashes new password
        updatedUser.password = hash; // sets it over the one sent through the body
      }
      Users.update(id, updatedUser)
        .then(updated => {
          res.status(200).json(updated[0]);
        })
        .catch(error => {
          res.status(400).json(error);
        });
    })
    .catch(err => res.status(500).json(err));
});

// Delete A User

/**
 * @api {delete} https://magic-the-gathering-tournament.herokuapp.com/api/auth/user Updates current user information
 * @apiUse UserNameAlreadyTaken
 * @apiUse EmailAlreadyTaken
 * @apiVersion 1.0.0
 * @apiName DeleteUser
 * @apiGroup User
 * @apiPermission token
 * @apiDescription Deletes the current logged in user based on the provided token
 * @apiSuccess {Object} user Returns a confirmation message
 * @apiSuccessExample {json} Success-Response:
 * {
 *      "message": "User ID:9 removed"
 * }
 *
 */
router.delete('/user', restricted, (req, res) => {
  const { id } = req.user;
  Users.remove(id)
    .then(event => {
      if (event) {
        res.status(200).json({ message: `User ID:${id} removed` });
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
 * @api {post} https://magic-the-gathering-tournament.herokuapp.com/api/auth/register Registers a new user
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
 * @apiSuccess {Object} message Welcome message and token for the new user
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Welcome mtgtourney!"
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzc5OTA4MzcsImV4cCI6MTU3ODA3NzIzN30.hF8BpMjHGwbAK-5AqXQZ3aBHu0G62KoaBFLWKe5KD1s"
 * }
 *
 */

router.post('/register', validator.register, (req, res) => {
  // implement registration
  req.body.password = bcrypt.hashSync(req.body.password, 8);

  Users.add(req.body)
    .then(saved => {
      const message = `Welcome ${saved[0].username}!`;
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

/**
 * @api {post} https://magic-the-gathering-tournament.herokuapp.com/api/auth/login Logins a new user
 * @apiUse LoginFieldsRequired
 * @apiUse InvalidEmailPassword
 * @apiVersion 1.0.0
 * @apiName LoginUser
 * @apiGroup Auth
 * @apiPermission none
 * @apiDescription Logins a new user
 * @apiParam {String} email The New Users email *Required
 * @apiParam {String} password The New Users password *Required
 * @apiParamExample {json} Sample Request
 * {
 *     "email": "mtgtourney@mtg.com",
 *     "password": "supersecretpassword"
 * }
 * @apiSuccess {Object} message Welcome message and token for the new user
 * @apiSuccessExample {json} Success-Response:
 * {
 *     "message": "Welcome back mtgtourney!"
 *     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1Nzc5OTA4MzcsImV4cCI6MTU3ODA3NzIzN30.hF8BpMjHGwbAK-5AqXQZ3aBHu0G62KoaBFLWKe5KD1s"
 * }
 *
 */

router.post('/login', validator.login, async (req, res) => {
  // implement login
  const { email, password } = req.body;
  Users.findBy({ email })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        const message = `Welcome back ${user.username}!`;
        res.status(200).json({ message, token });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
