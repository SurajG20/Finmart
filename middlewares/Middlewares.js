module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

module.exports.isAdminLoggedIn = (req, res, next) => {
  if (req.session.user.isAdmin === false) {
    return res
      .status(403)
      .json({ message: 'You are not allowed to do this!!' });
  }
  next();
};
