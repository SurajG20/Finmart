module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  next();
};

module.exports.isAdminLoggedIn = (req, res, next) => {
  if (req.session && req.session.user && req.session.user.isAdmin === true) {
    // User is an admin, allow the request to continue
    next();
  } else {
    // User is not an admin or the session/user object is not defined, redirect to an error page
    res.redirect('error');
  }
};
