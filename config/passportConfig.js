const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (username, password, done) => {
      try {
        let user;
        if (username.includes('@')) {
          user = await UserModel.findOne({ email: username });
        } else {
          user = await UserModel.findOne({ phoneNumber: username });
        }

        if (!user) {
          return done(null, false); 
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

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:8000/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await UserModel.findOne({ googleId: profile.id });

          if (!user) {
            const newUser = new UserModel({
              username: profile.displayName,
              email: profile.emails[0].value,
              phoneNumber: '',
              googleId: profile.id,
            });

            user = await newUser.save();
          }
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser(async (id, cb) => {
    try {
      const user = await UserModel.findOne({ _id: id });
      if (!user) {
        return cb(null, null);
      }
      cb(null, user);
    } catch (err) {
      return cb(err);
    }
  });
};
