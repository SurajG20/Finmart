const bcrypt = require('bcrypt');
const User = require('../models/User');
module.exports.Register = async (req, res) => {
  const { firstname, lastname, number, password, email } = req.body;
  try {
    if (!firstname || !lastname || !number || !email || !password) {
      return res.status(400).json({ message: 'All fields are required!' });
    }
    let username = `${firstname} ${lastname}`;
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    res.redirect('error');
  }
};

module.exports.Login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: 'Wrong credentials' });
    }

    const isPasswordMatched = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordMatched) {
      return res.redirect('error');
    }

    req.session.user = user;

    if (user.isAdmin) {
      res.redirect('/admin');
    } else if (user.isLoanTaken) {
      res.redirect('/user');
    } else {
      res.redirect('/loan');
    }
  } catch (error) {
    res.redirect('error');
  }
};

module.exports.Logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};