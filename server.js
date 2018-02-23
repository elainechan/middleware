'use strict';

require('dotenv').config();
const express = require('express');
const queryString = require('query-string');

const app = express();
const {gateKeeper} = require('./middlewares/gatekeeper');

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

app.use(gateKeeper);

// this endpoint returns a json object representing the user making the request,
// IF they supply valid user credentials. This endpoint assumes that `gateKeeper` 
// adds the user object to the request if valid credentials were supplied.
app.get("/api/users/me", (req, res) => {
  // send an error message if no or wrong credentials sent
  if (req.user === undefined) {
    return res.status(403).json({message: 'Must supply valid user credentials'});
  }
  // we're only returning a subset of the properties
  // from the user object. Notably, we're *not*
  // sending `password` or `isAdmin`.
  const {firstName, lastName, id, userName, position} = req.user;
  return res.json({firstName, lastName, id, userName, position});
});

app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${process.env.PORT}`);
});