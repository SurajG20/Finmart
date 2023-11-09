module.exports.isLoggedIn = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
};

module.exports.isAdminLoggedIn = (req, res, next) => {
  console.log('admin',req.user);
  if (req.isAuthenticated() && req.user.isAdmin === true) {
    next();
  } else {
    res.redirect('/error');
  }
};
