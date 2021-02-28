//Installed dependencies and libraries
const express = require('express');
const app = express();
const ejsMate = require('ejs-mate')
const path = require('path');
const mongoose = require('mongoose');
const catchAsync = require('./utilities/catchAsync');
const ExpressError = require('./utilities/ExpressError');
const Campground = require('./models/campgrounds');
const methodOverride = require('method-override');

//Connect to mongo DB using mongoose
mongoose.connect('mongodb://localhost:27017/yelpCamp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected!!');
});

//middleware
app.engine('ejs', ejsMate); //use ejs locals for all ejs templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

//**ROUTES**
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/campgrounds', catchAsync(async (req, res) => {
  const camps = await Campground.find({});
  res.render('campgrounds/index', { camps, title: 'All Campgrounds' });
}))

//CREATE a new campground
//serve form to create the new campground
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new', { title: 'Add Campground' })
})


//POST route where the form from new route will be submitted. Then create the new campground, insert into the database, then redirect and display the newly created instance 
app.post('/campgrounds', catchAsync(async (req, res) => {
  if (!req.body.campground) throw new ExpressError('Invalid Campground Data', 400);
  const newCampground = new Campground(req.body.campground);
  await newCampground.save();
  res.redirect(`/campgrounds/${newCampground._id}`)
}))

//READ/SHOW route for individual campgrounds
app.get('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  res.render('campgrounds/show', { camp, title: camp.title })
}))

//UPDATE 
//GET route to render the new form for updating the information
app.get('/campgrounds/:id/edit', catchAsync(async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  res.render('campgrounds/edit', { camp, title: `Update ${camp.title}` })
}))

//PUT route for changing/updating data about a single/specific campground, then insert into the database, and then redirect and display the newly updated instance 
app.put('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedCamp = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true, new: true });
  res.redirect(`/campgrounds/${updatedCamp._id}`)
}))

//DESTROY
//Delete route to find a specific instance of one campground and remove that camp and all its data from the database.
app.delete('/campgrounds/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  await Campground.findByIdAndDelete(id);
  res.redirect('/campgrounds')
}))

//Catch all error handler for a route that had not been defined
app.all('*', (req, res, next) => {
  next(new ExpressError('Page Not Found', 404))
})

app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  res.status(statusCode).send(message)
  res.send('OH NO , SOMETHING WENT WRONG!!!!!!!')
})

//start server listening for requests
app.listen(3000, () => {
  console.log('Listening ON PORT 3000!!!')
})