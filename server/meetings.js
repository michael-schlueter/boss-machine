const express = require('express');
const meetingsRouter = express.Router();
const {
  createMeeting,
  getAllFromDatabase,
  addToDatabase,
  deleteAllFromDatabase,
} = require('./db');

// Get an array of all meetings
meetingsRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('meetings'));
});

// Create a new meeting and save it to the database
meetingsRouter.post('/', (req, res, next) => {
  const newMeeting = addToDatabase('meetings', createMeeting());
  res.status(201).send(newMeeting);
});

// Delete all meetings from the database
meetingsRouter.delete('/', (req, res, next) => {
  deleteAllFromDatabase('meetings');
  res.status(204).send();
})


module.exports = meetingsRouter;