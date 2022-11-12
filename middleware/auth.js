const crypto = require('crypto');
let _token = null;
require('dotenv').config();

const authenticate = (req, res, next) => {
    req.logged = _token === req.cookies["token"];
    return next();
}

const hash = (password) => {
    return crypto.createHash('sha256').update(password).digest('base64');
}

const createToken = () => {
    const token = crypto.randomBytes(30).toString('hex');
    _token = token;
    return token;
}

const getToken = () => _token;

module.exports = {authenticate, hash, createToken, getToken}