'use strict';
// write a `gateKeeper` middleware function that:
//  1. looks for a 'x-username-and-password' request header
//  2. parses values sent for `user` and `pass` from 'x-username-and-password'
//  3. looks for a user object matching the sent username and password values
//  4. if matching user found, add the user object to the request object
//     (aka, `req.user = matchedUser`)
function gateKeeper(req, res, next) {
  const header = req.get('x-username-and-password');
  if (header) {
    console.log(header);
    const userObject = queryString.parse(header);
    const match = USERS.filter((user) => user.userName === userObject.user && user.password === userObject.pass);
    if (match) {
      req.user = match;
    }
    return req.user;
  }
  next();
}
module.exports = {gateKeeper};