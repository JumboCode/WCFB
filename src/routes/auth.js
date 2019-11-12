const jwt = require('express-jwt');
const cookie = require('cookie');

const getTokenFromHeaders = (req) => {
  console.log('here');
  cookies = req.headers.cookie;
  if (cookies) {
    cooks = cookie.parse(cookies);
    if (cooks.jwt) {
      return cooks.jwt;
    }
  }
  return null;
};

const auth = {
  required: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: 'secret',
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};

module.exports = auth;
