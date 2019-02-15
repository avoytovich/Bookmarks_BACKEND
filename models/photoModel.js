const mongoose = require('mongoose');

const PhotosSchema = mongoose.Schema({
  title: String,
  description: String,
  event: String,
  //userId: Number,
}, {
  timestamps: true
});

module.exports = mongoose.model('Photos', PhotosSchema);