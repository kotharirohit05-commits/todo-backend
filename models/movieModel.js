const mongoose = require("mongoose");


// SCHEMA
const movieSchema = new mongoose.Schema({

    name: String,

    year: Number

});


// MODEL
const Movie = mongoose.model("Movie", movieSchema);


module.exports = Movie;