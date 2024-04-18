const jwt = require('jsonwebtoken');

function validateAccessToken(token) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
}

function validateRefreshToken(token) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
}

module.exports = { validateAccessToken, validateRefreshToken };
