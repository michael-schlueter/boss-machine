const express = require("express");
const minionsRouter = express.Router();
const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require("./db");

// Check if the received ID is valid and exists in the database
minionsRouter.param("minionId", (req, res, next, id) => {
  const receivedMinion = getFromDatabaseById("minions", id);
  if (receivedMinion) {
    req.minion = receivedMinion;
    next();
  } else {
    res.status(404).send("Invalid ID");
  }
});

// Get an array of all minions
minionsRouter.get("/", (req, res, next) => {
  res.send(getAllFromDatabase("minions"));
});

// Get a single minion by ID
minionsRouter.get("/:minionId", (req, res, next) => {
  res.send(req.minion);
})

// Create a new minion and save it to the database
minionsRouter.post("/", (req, res, next) => {
  const newMinion = addToDatabase("minions", req.body);
  res.status(201).send(newMinion);
});

// Delete a single minion by ID
minionsRouter.delete("/:minionId", (req, res, next) => {
  deleteFromDatabasebyId('minions', req.params.minionId);
  res.status(204).send(req.minion);
});

// Update a single minion by ID
minionsRouter.put("/:minionId", (req, res, next) => {
  updateInstanceInDatabase('minions', req.body);
  res.status(200).send(req.body);
});

// Check if the received ID is valid and exists in the database
minionsRouter.param("workId", (req, res, next, id) => {
  const receivedWork = getFromDatabaseById('work', id);
  if (receivedWork) {
    req.work = receivedWork;
    next();
  } else {
    res.status(404).send("Invalid ID");
  }
}); 

// Get an array of all work for the specified minion
minionsRouter.get("/:minionId/work", (req, res, next) => {
  res.send(getAllFromDatabase("work").filter(work => work.minionId === req.minion.id));
});

// Create a new work object and save it to the database
minionsRouter.post("/:minionId/work", (req, res, next) => {
  const workToAdd = req.body;
  workToAdd.minionId = req.params.minionId;
  const newWork = addToDatabase("work", workToAdd);
  res.status(201).send(newWork);
});

// Update a single work by ID
minionsRouter.put("/:minionId/work/:workId", (req, res, next) => {
  if (req.work.minionId === req.params.minionId) {
    updateInstanceInDatabase('work', req.body);
    res.status(200).send(req.body);
  } else {
    res.status(400).send()
  }
});

// Delete a single work by ID
minionsRouter.delete("/:minionId/work/:workId", (req, res, next) => {
  deleteFromDatabasebyId('work', req.params.workId);
  res.status(204).send(req.work);
}); 

module.exports = minionsRouter;
