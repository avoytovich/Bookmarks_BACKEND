module.exports = (app) => {
  const {
    photoController,
    userController
  } = require('./controllers');

  // Create a new Photo
  app.post('/photo', photoController.create);

  // Retrieve all Photos
  app.get('/photos', photoController.findAll);

  // Retrieve a single Photo with photoId
  app.get('/photos/:photoId', photoController.findOne);

  // Update a Note with photoId
  app.put('/photos/:photoId', photoController.update);

  // Delete a Note with photoId
  app.delete('/photos/:photoId', photoController.delete);

  // Create a new User
  app.post('/user', userController.create);
}