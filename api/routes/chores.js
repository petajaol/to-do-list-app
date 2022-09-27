const express = require("express");
const router = express.Router();
const choresService = require("../services/chores");

router.get("/:id?", function (req, res, next) {
  if (req.params.id) {
    try {
      res.json(choresService.getOne(req.params.id)[0]);
    } catch (err) {
      console.error(`Error while getting chores `, err.message);
      next(err);
    }
  } else {
    try {
      res.json(choresService.getAll());
    } catch (err) {
      console.error(`Error while getting chores `, err.message);
      next(err);
    }
  }
});

router.post("/", function (req, res, next) {
  try {
    res.json(choresService.create(req.body));
  } catch (err) {
    console.error(`Error while adding chores `, err.message);
    next(err);
  }
});

router.patch("/:id", function (req, res, next) {
  try {
    res.json(choresService.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating chores `, err.message);
    next(err);
  }
});

router.delete("/:id", function (req, res, next) {
  try {
    res.json(choresService.delete(req.params.id));
  } catch (err) {
    console.error(`Error while deleting chores `, err.message);
    next(err);
  }
});

module.exports = router;
