module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

module.exports.isAdminLoggedIn = (req, res, next) => {
  if (req.isAuthenticated() && req.user.isAdmin === true) {
    next();
  } else {
    res.redirect('/error');
  }
};
