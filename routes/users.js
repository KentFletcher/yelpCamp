const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users')
const { returnToPage, isLoggedIn } = require('../middleware')

router.route('/register')
  .get(returnToPage, users.renderRegisterForm)
  .post(catchAsync(users.registerUser))

router.route('/login')
  .get(returnToPage, users.renderLogInForm)
  .post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), users.loginUser)

router.get('/logout', users.logoutUser)

module.exports = router;