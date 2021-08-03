const express = require('express');
const ideasRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db');
const checkMillionDollarIdea = require('./checkMillionDollarIdea');

// Check if the received ID is valid and exists in the database
ideasRouter.param("ideaId", (req, res, next, id) => {
  const receivedIdea = getFromDatabaseById("ideas", id);
  if (receivedIdea) {
    req.idea = receivedIdea;
    next();
  } else {
    res.status(404).send("Invalid ID");
  }
});

// Get an array of all ideas
ideasRouter.get('/', (req, res, next) => {
  res.send(getAllFromDatabase('ideas'));
});

// Get a single idea by ID
ideasRouter.get('/:ideaId', (req, res, next) => {
  res.send(req.idea);
})

// Create a new idea and save it to the database
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
  const newIdea = addToDatabase('ideas', req.body);
  res.status(201).send(newIdea);
});

// Delete a single idea by ID
ideasRouter.delete("/:ideaId", (req, res, next) => {
  deleteFromDatabasebyId('ideas', req.params.ideaId);
  res.status(204).send(req.idea);
});

// Update a single idea by ID
ideasRouter.put("/:ideaId", checkMillionDollarIdea, (req, res, next) => {
  updateInstanceInDatabase('ideas', req.body);
  res.status(200).send(req.body);
});

module.exports = ideasRouter;
