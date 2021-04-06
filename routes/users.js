const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users')

router.route('/register')
  .get(users.renderRegisterForm)
  .post(catchAsync(users.registerUser))

router.route('/login')
  .get(users.renderLogInForm)
  .post(passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), users.logInUser)

router.get('/logout', users.logoutUser)

module.exports = router;