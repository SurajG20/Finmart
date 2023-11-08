const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        // Check if the input is an email or phone number
        let user;
        if (username.includes('@')) {
          user = await UserModel.findOne({ email: username });
        } else {
          user = await UserModel.findOne({ phoneNumber: username });
        }

        if (!user) {
          return done(null, false); // User not found
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return done(null, user);
        } else {
          return done(null, false); // Incorrect password
        }
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        return cb(null, null); // User not found
      }

      cb(null, user); // Pass the entire user object
    } catch (err) {
      return cb(err);
    }
  });
};
