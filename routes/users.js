const express = require('express');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../utilities/catchAsync');

router.get('/register', (req, res) => {
  res.render('users/register', { title: 'Register' })
})

router.post('/register', catchAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email });
  const newUser = await User.register(user, password);
  res.send(newUser)
}))

// app.get('/fakeUser', async (req, res) => {
//   //   const user = new User({ email: 'kfsOne@gmail.com', username: 'kfsOne' });
//   //   const newUser = await User.register(user, 'chicken');//The register method being called on User, takes the entire user model, or the instanceof the model (user, from the line above), and then a password(chicken, in this example), its then going to hash that password, adds a salt and stores both the hashed password and the salt on the user.
//   //   res.send(newUser)
//   // })

module.exports = router;