//Installed dependencies and libraries
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Campground = require('./models/campgrounds')

//Connect to mongo DB using mongoose
mongoose.connect('mongodb://localhost:27017/yelpCamp', { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database Connected!!');
});

//middleware
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

//**ROUTES**
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/campgrounds', async (req, res) => {
  const camps = await Campground.find({});
  res.render('campgrounds/index', { camps });
})

//Create a new campground
//serve form to create the new campground
app.get('/campgrounds/new', (req, res) => {
  res.render('campgrounds/new')
})

//post route where the form from new route will be submitted. Then create the new campground, insert into the database, then redirect and display the newly created instance 
app.post('/campgrounds', async (req, res) => {
  const newCampground = new Campground(req.body.campground);
  await newCampground.save();
  res.redirect(`/campgrounds/${newCampground._id}`)
})

//READ/SHOW route for individual campgrounds
app.get('/campgrounds/:id', async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  res.render('campgrounds/show', { camp })
})

//start server listening for requests
app.listen(3000, () => {
  console.log('Listening ON PORT 3000!!!')
})