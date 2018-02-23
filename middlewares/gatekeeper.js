'use strict';
const queryString = require('query-string');
// write a `gateKeeper` middleware function that:
//  1. looks for a 'x-username-and-password' request header
//  2. parses values sent for `user` and `pass` from 'x-username-and-password'
//  3. looks for a user object matching the sent username and password values
//  4. if matching user found, add the user object to the request object
//     (aka, `req.user = matchedUser`)

const USERS = [
  {id: 1,
   firstName: 'Joe',
   lastName: 'Schmoe',
   userName: 'joeschmoe@business.com',
   position: 'Sr. Engineer',
   isAdmin: true,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  },
  {id: 2,
   firstName: 'Sally',
   lastName: 'Student',
   userName: 'sallystudent@business.com',
   position: 'Jr. Engineer',
   isAdmin: true,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  },
  {id: 3,
   firstName: 'Lila',
   lastName: 'LeMonde',
   userName: 'lila@business.com',
   position: 'Growth Hacker',
   isAdmin: false,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  },
  {id: 4,
   firstName: 'Freddy',
   lastName: 'Fun',
   userName: 'freddy@business.com',
   position: 'Community Manager',
   isAdmin: false,
   // NEVER EVER EVER store passwords in plain text in real life. NEVER!!!!!!!!!!!
   password: 'password'
  }
];

function gateKeeper(req, res, next) {
  console.log(`Gatekeeper called`);
  const userInfo = req.get('x-username-and-password');
    console.log(userInfo);
    const userObject = queryString.parse(userInfo);
    const match = USERS.filter((user) => user.userName === userObject.user && user.password === userObject.pass);
    console.log(match);
    if (match) {
      req.user = match;
    }
    return req.user;
  next();
}

module.exports = {gateKeeper};