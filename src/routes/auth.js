const jwt = require('express-jwt');
const cookie = require('cookie');

const getTokenFromHeaders = (req) => {
/* const { headers: { authorization } } = req;

  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null; */
  cookies = req.headers.cookie;
  if (cookies) {
    cooks = cookie.parse(cookies);
    if (cooks.jwt) {
      return cooks.jwt;
    }
  }
  console.log(headers);
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
