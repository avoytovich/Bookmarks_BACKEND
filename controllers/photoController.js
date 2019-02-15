const Photo = require('./../models/photoModel');

//Create new Photo
exports.create = (req, res) => {
  // Request validation
  if(!req.body) {
    return res.status(400).send({
      message: "Photo content can not be empty"
    });
  }

  // Create a Photo
  const photo = new Photo({
    title: req.body.title || "No photo title",
    description: req.body.description,
    event: req.body.event,
    //userId: req.user.id
  });

  // Save Photo in the database
  photo.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Something wrong while creating the photo."
    });
  });
};

// Retrieve all photos from the database.
exports.findAll = (req, res) => {
  Photo.find()
    .then(photos => {
      res.send(photos);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Something wrong while retrieving photos."
    });
  });
};

// Find a single photos with a photoId
exports.findOne = (req, res) => {
  Photo.findById(req.params.photoId)
    .then(photo => {
      if(!photo) {
        return res.status(404).send({
          message: "Photos not found with id " + req.params.photoId
        });
      }
      res.send(photo);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Photo not found with id " + req.params.photoId
      });
    }
    return res.status(500).send({
      message: "Something wrong retrieving photo with id " + req.params.photoId
    });
  });
};

// Update a photo
exports.update = (req, res) => {
  // Validate Request
  if(!req.body) {
    return res.status(400).send({
      message: "Photo content can not be empty"
    });
  }

  // Find and update photo with the request body
  Photo.findByIdAndUpdate(req.params.photoId, {
    title: req.body.title || "No photo title",
    description: req.body.description,
    event: req.body.event,
    //userId: req.user.id
  }, {new: true})
    .then(photo => {
      if(!photo) {
        return res.status(404).send({
          message: "Photo not found with id " + req.params.photoId
        });
      }
      res.send(photo);
    }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
        message: "Photo not found with id " + req.params.photoId
      });
    }
    return res.status(500).send({
      message: "Something wrong updating note with id " + req.params.photoId
    });
  });
};

// Delete a note with the specified noteId in the request
exports.delete = (req, res) => {
  Photo.findByIdAndRemove(req.params.photoId)
    .then(photo => {
      if(!photo) {
        return res.status(404).send({
          message: "Photo not found with id " + req.params.photoId
        });
      }
      res.send({message: "Photo deleted successfully!"});
    }).catch(err => {
    if(err.kind === 'ObjectId' || err.name === 'NotFound') {
      return res.status(404).send({
        message: "Photo not found with id " + req.params.photoId
      });
    }
    return res.status(500).send({
      message: "Could not delete photo with id " + req.params.photoId
    });
  });
};