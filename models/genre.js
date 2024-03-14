// models/genre.js
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GenreSchema = new Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 100 },
  url: { type: String, required: true }
});

// Export model
module.exports = mongoose.model('Genre', GenreSchema);
