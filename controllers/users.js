const User = require('../models/user');
const session = require('express-session');

module.exports.renderRegisterForm = (req, res) => {
  res.render('users/register', { title: 'Register' })
}

module.exports.registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ username, email });
    const newUser = await User.register(user, password);
    req.login(user, err => {
      if (err) return next(err);
      req.flash('success', `Welcome to YelpCamp ${username}!`)
      return res.redirect('/campgrounds');
    })
  } catch (e) {
    req.flash('error', e.message);
    res.redirect('register')
  }
}

module.exports.renderLogInForm = (req, res) => {
  res.render('users/login', { title: 'Login' })
}

module.exports.loginUser = (req, res) => {
  req.flash('success', `Welcome back ${req.user.username}!`);
  const redirectUrl = req.session.returnToUrl || '/campgrounds';
  delete req.session.returnToUrl;
  res.redirect(redirectUrl);
}

module.exports.logoutUser = (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out. Thanks for visiting!!')
  res.redirect('/campgrounds')
}