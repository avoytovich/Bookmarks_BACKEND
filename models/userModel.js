const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: String,
  email: String,
  picture: Object,
  userId: String,
  token: String,
  links: Array,
}, {
  timestamps: true
});

UserSchema.statics.registerFacebookUser = function(
  accessToken,
  refreshToken,
  profile,
  cb,
) {
  var that = this;
  return that.findOne(
    {
      userId: profile.id,
    },
    (err, user) => {
      console.log('user', user);
      // no user was found, lets create a new one
      if (!user) {
        var newUser = new that({
          name: profile.displayName,
          email: profile.emails[0].value,
          picture: profile.photos[0].value,
          userId: profile.id,
          token: accessToken,
          links: [],
        });

        newUser.save(function(error, savedUser) {
          if (error) {
            console.log(error);
          }
          return cb(error, savedUser);
        });
      } else {
        return cb(err, user);
      }
    },
  );
};

module.exports = mongoose.model('User', UserSchema);