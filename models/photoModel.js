const mongoose = require('mongoose');

const PhotoSchema = mongoose.Schema({
  title: String,
  description: String,
  event: String,
  //userId: Number,
}, {
  timestamps: true
});

module.exports = mongoose.model('Photo', PhotoSchema);