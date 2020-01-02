const Users = require('../users/auth-helpers');

async function register(req, res, next) {
  if (!req.body.email || !req.body.username || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'Email, username, and password are required' });
  }
  const checkEmail = await Users.findBy({ email: req.body.email });
  if (checkEmail.length > 0) {
    return res.status(400).json({ message: 'Email is already taken' });
  }
  const checkUsername = await Users.findBy({ username: req.body.username });
  if (checkUsername.length > 0) {
    return res.status(400).json({ message: 'Username is already taken' });
  }
  next();
}

async function login(req, res, next) {
  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: 'Email and password are required.' });
  }
}

module.exports = { register, login };
