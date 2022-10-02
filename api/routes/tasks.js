const express = require("express");
const router = express.Router();
const tasksService = require("../services/tasks");

router.get("/:id?", function (req, res, next) {
  if (req.params.id) {
    try {
      res.json(tasksService.getOne(req.params.id));
    } catch (err) {
      console.error(`Error while getting tasks `, err.message);
      next(err);
    }
  } else {
    try {
      res.json(tasksService.getAll());
    } catch (err) {
      console.error(`Error while getting tasks `, err.message);
      next(err);
    }
  }
});

router.post("/", function (req, res, next) {
  try {
    res.json(tasksService.create(req.body));
  } catch (err) {
    console.error(`Error while adding tasks `, err.message);
    next(err);
  }
});

router.patch("/:id", function (req, res, next) {
  try {
    res.json(tasksService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating tasks `, err.message);
    next(err);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    res.json(tasksService.delete(req.params.id));
  } catch (err) {
    console.error(`Error while deleting tasks `, err.message);
    next(err);
  }
});

module.exports = router;
