const passwordHash = require('password-hash');
const User = require('./../models/userModel');

exports.create = (req, res) => {
  // Request validation
  if(!req.body) {
    return res.status(400).send({
      message: "SignUp content can not be empty"
    });
  }

  // Create a User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    picture: req.body.picture,
    userId: req.body.userId,
    links: req.body.links,
  });

  // Save User in the database
  user.save()
    .then(data => {
      res.send(data);
    }).catch(err => {
    res.status(500).send({
      message: err.message || "Something wrong while creating the user."
    });
  });
}