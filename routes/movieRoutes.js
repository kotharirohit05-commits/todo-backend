const express = require("express");

const router = express.Router();

const { createMovie } = require("../controllers/movieController");

router.post("/movies", createMovie);


module.exports = router;