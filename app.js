//Installed dependencies and libraries
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const ExpressError = require('./utilities/ExpressError');
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const campgroundRoutes = require('./routes/campgrounds')
const reviewRoutes = require('./routes/reviews')
const userRoutes = require('./routes/users')

//Connect to mongo DB using mongoose
mongoose.connect('mongodb://localhost:27017/yelpCamp', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected!!');
});

const app = express();
//middleware
app.engine('ejs', ejsMate); //use ejs locals for all ejs templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfiguration = {
  secret: 'thisshouldbeabettersecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7
  }
}
app.use(session(sessionConfiguration));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser()); // Generates a function that is used by Passport to serialize (store data or start session) users into the session.  Comes from the plugin on the model
passport.deserializeUser(User.deserializeUser()); //Generates a function that is used by Passport to deserialize (basically end a session) users into the session. Comes from the plugin on the model

//Middleware for responding with a flash
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})

//**ROUTES**
// app.get('/fakeUser', async (req, res) => {
//   const user = new User({ email: 'kfsOne@gmail.com', username: 'kfsOne' });
//   const newUser = await User.register(user, 'chicken');//The register method being called on User, takes the entire user model, or the instanceof the model (user, from the line above), and then a password(chicken, in this example), its then going to hash that password, adds a salt and stores both the hashed password and the salt on the user.
//   res.send(newUser)
// })

app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes)
app.use('/', userRoutes)

app.get('/', (req, res) => {
  res.render('home')
})

//Catch all error handler for a route that had not been defined
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = 'OH NO , SOMETHING WENT WRONG!!!!!!!';
  res.status(statusCode).render('error', { err })
})

//start server listening for requests
app.listen(3000, () => {
  console.log('Listening ON PORT 3000!!!')
})