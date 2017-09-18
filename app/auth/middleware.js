// check if request comes from authenticated user
module.exports = {
  isAuth: (req, res, next) => {
    console.log('**************************');
    console.log(req.user);
    console.log(req.session);
    console.log(req.isAuthenticated());
    console.log('**************************');

    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }
};
