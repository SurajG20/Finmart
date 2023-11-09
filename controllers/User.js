const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

module.exports.Login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) res.redirect('/login');
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        if (user.isAdmin) {
          return res.redirect('/admin');
        } else if (user.isLoanTaken) {
          return res.redirect('/user');
        }
        res.redirect('/loan');
      });
    }
  })(req, res, next);
};

module.exports.Register = async (req, res) => {
  console.log(req.body);
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });

    if (existingUser) {
      res.send('User Already Exists');
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const newUser = new UserModel({
        username: req.body.username,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: hashedPassword,
      });
      await newUser.save();
      res.redirect('/login');
    }
  } catch (err) {
    res.redirect('/error');
  }
};

module.exports.Logout = (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
};
