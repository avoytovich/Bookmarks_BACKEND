module.exports = (app) => {
  const photo = require('./controllers/photoController');

  // Create a new Photo
  app.post('/photo', photo.create);

  // Retrieve all Photos
  app.get('/photos', photo.findAll);

  // Retrieve a single Photo with photoId
  app.get('/photos/:photoId', photo.findOne);

  // Update a Note with photoId
  app.put('/photos/:photoId', photo.update);

  // Delete a Note with photoId
  app.delete('/photos/:photoId', photo.delete);
}