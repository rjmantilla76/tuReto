// check if request comes from authenticated user
module.exports = {
  isAuth: (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }
};
