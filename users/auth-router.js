const router = require('express').Router();
const bcrypt = require('bcryptjs');
const validator = require('../auth/authentication-validators');

const restricted = require('../auth/authenticate-middleware.js');
const generateToken = require('../auth/generateToken.js');
const Users = require('./auth-helpers.js');

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
router.post('/register', validator.register, (req, res) => {
  // implement registration
  const { username, password, email, location } = req.body;
  const hash = bcrypt.hashSync(password, 8);
  password = hash;
  username = username.toLowerCase();
  email = email.toLowerCase();
  location = location.toLowerCase();
  user = { username, password, email, location };

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(400).json({ message: 'Invalid Registration, please try again.' });
    });
});

// Login with an existing User
router.post('/login', validator.login, (req, res) => {
  // implement login
  let { email, password } = req.body;
  console.log('email and password', email, password)
  email = email.toLowerCase();
  console.log('email lowcase', email)
  Users.findBy({ email })
    // .first()
    .then(user => {
      console.log('This is the user', user)
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        user.token = token;
        res.status(200).json(user);
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    }).catch(err => {
      console.log('this is the err at the end 117', err)
    })

});

module.exports = router;
