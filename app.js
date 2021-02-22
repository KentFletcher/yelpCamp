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

//routes
app.get('/', (req, res) => {
  res.render('home')
})

app.get('/campgrounds', async (req, res) => {
  const camps = await Campground.find({});
  res.render('campgrounds/index', { camps })
})

//start server listening for requests
app.listen(3000, () => {
  console.log('Listening ON PORT 3000!!!')
})