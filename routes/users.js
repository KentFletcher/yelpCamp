const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utilities/catchAsync');
const passport = require('passport');
const session = require('express-session');

router.get('/register', (req, res) => {
  res.render('users/register', { title: 'Register' })
})

router.post('/register', catchAsync(async (req, res, next) => {
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
}))

router.get('/login', (req, res) => {
  res.render('users/login', { title: 'Login' })
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), (req, res) => {
  req.flash('success', `Welcome back ${req.user.username}!`);
  const redirectUrl = req.session.returnToUrl || '/campgrounds';
  delete req.session.returnToUrl;
  res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'Successfully logged out. Thanks for visiting!!')
  res.redirect('/campgrounds')
})

module.exports = router;