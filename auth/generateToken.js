const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')


module.exports = (user) => {
    const payload = {
        subject: user.id,
        username: user.username,
    };
    const options = {
        expiresIn: '24h',
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
}