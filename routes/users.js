const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const catchAsync = require('../utilities/catchAsync');
const users = require('../controllers/users')

router.get('/register', users.renderRegisterForm)

router.post('/register', catchAsync(users.registerUser))

router.get('/login', users.renderLogInForm)

router.post('/login',
  passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }),
  users.logInUser
)

router.get('/logout', users.logoutUser)

module.exports = router;