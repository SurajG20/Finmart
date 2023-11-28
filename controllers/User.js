const UserModel = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');
const randomString = require('randomstring');
const nodeMailer = require('nodemailer');
const fast2sms = require('fast-two-sms');

const sendResetPasswordMail = async (name, email, token) => {
  try {
    const transporter = nodeMailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      requireTLS: true,
      auth: {
        user: process.env.AUTHUSER,
        pass: process.env.AUTHPASS,
      },
    });
    const mailOptions = {
      from: process.env.AUTHUSER,
      to: email,
      subject: 'Reset Password',
      html: `<h1>Hi ${name}</h1><br><h3>Please click on the link to reset your password</h3><br><a href="https://vinayakfinmart.com/reset-password?token=${token}">Reset Password</a>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};
module.exports.Login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) throw err;
    if (!user) {
      return res.render('login', { error: 'Invalid username or password' });
    } else {
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
  try {
    const existingUser = await UserModel.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }],
    });

    if (existingUser) {
      return res.render('register', { error: 'User already exists' });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      const options = {
        authorization:
          'fHom1jzgEiFN3uPXpZBGw79dTAeCWDJVa2tQLb8S6cROnrY4kszUFHTilE3G1AsWInZoLPRujCBKd95t',
        message: 'YOUR_MESSAGE_HERE',
        numbers: ['9691414058'],
      };
      fast2sms.sendMessage(options);

      // const newUser = new UserModel({
      //   username: req.body.username,
      //   email: req.body.email,
      //   phoneNumber: req.body.phoneNumber,
      //   password: hashedPassword,
      // });
      // await newUser.save();
      // res.redirect('/login');
    }
  } catch (err) {
    res.redirect('/error', { message: 'Something went wrong' });
  }
};

module.exports.Logout = (req, res) => {
  req.session.destroy(function (err) {
    res.redirect('/');
  });
};

module.exports.GoogleCallback = (req, res) => {
  passport.authenticate('google', { failureRedirect: '/login' })(
    req,
    res,
    () => {
      res.redirect('/');
    }
  );
};

module.exports.GoogleLogin = passport.authenticate('google', {
  scope: ['profile', 'email'],
});

module.exports.ForgetPassword = async (req, res) => {
  try {
    const username = req.body.username;
    const existingUser = await UserModel.findOne({
      $or: [{ email: username }, { phoneNumber: username }],
    });
    if (!existingUser) {
      return res.render('forget-password', {
        error: 'User with this email or phone number does not exist',
      });
    } else {
      const randomToken = randomString.generate();
      await UserModel.updateOne(
        { email: username },
        { $set: { token: randomToken } }
      );
      await sendResetPasswordMail(
        existingUser.username,
        existingUser.email,
        randomToken
      );
      res.render('forget-password', {
        message: 'Reset Password Link Sent to your Email',
      });
    }
  } catch (error) {
    res.redirect('/error', { message: 'Something went wrong' });
  }
};

module.exports.ResetPassword = async (req, res) => {
  try {
    const { userId, email, password, confirmpassword } = req.body;
    const currentUser = await UserModel.findById(userId);
    if (password !== confirmpassword) {
      return res.render('reset-password', {
        error: 'Passwords do not match',
        currentUser,
      });
    }
    const ResetUser = await UserModel.findOne({ email: email });
    if (!ResetUser) {
      return res.render('reset-password', {
        error: 'User with this email does not exist',
        currentUser,
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await UserModel.updateOne(
        { email: email },
        { $set: { password: hashedPassword } }
      );
      return res.redirect('/login');
    }
  } catch (error) {
    return res.render('error', { error });
  }
};
