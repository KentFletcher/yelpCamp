const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campgrounds');
const ExpressError = require('../utilities/ExpressError');
const { campgroundSchema } = require('../schemas.js');
const { Router } = require('express');
const { isLoggedIn } = require('../middleware')

//Middleware to handle server-side validation
const validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(ele => ele.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}

router.get('/', catchAsync(async (req, res) => {
  const camps = await Campground.find({});
  res.render('campgrounds/index', { camps, title: 'All Campgrounds' });
}))

//CREATE
//serve form to create the new campground
router.get('/new', isLoggedIn, (req, res) => {
  res.render('campgrounds/new', { title: 'Add Campground' })
})

//POST route where the form from new route will be submitted. Then create the new campground, insert into the database, then redirect and display the newly created instance, validateCampground is the server-side error handler 
router.post('/', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
  const newCampground = new Campground(req.body.campground);
  newCampground.author = req.user._id;
  await newCampground.save();
  req.flash('success', 'Thanks for adding a new campground!')
  res.redirect(`/campgrounds/${newCampground._id}`)
}))

//READ
// SHOW route for individual campgrounds
router.get('/:id', catchAsync(async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id).populate('reviews').populate('author');
  if (!camp) {
    req.flash('error', 'CANNOT FIND THAT CAMPGROUND')
    return res.redirect('/campgrounds')
  }
  res.render('campgrounds/show', { camp, title: camp.title })
}))

//UPDATE 
//GET route to render the new form for updating the information
router.get('/:id/edit', isLoggedIn, catchAsync(async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  if (!camp) {
    req.flash('error', 'CANNOT FIND THAT CAMPGROUND')
    return res.redirect('/campgrounds')
  } else if (!camp.author.equals(req.user._id)) {
    req.flash('error', "Only the author can edit campground!!");
    return res.redirect(`/campgrounds/${camp.id}`)
  }
  res.render('campgrounds/edit', { camp, title: `Update ${camp.title}` })
}))

//PUT route for changing/updating data about a single/specific campground, then insert into the database, and then redirect and display the newly updated instance 
router.put('/:id', isLoggedIn, validateCampground, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
  if (!camp.author.equals(req.user._id)) {
    req.flash('error', "Only the author can edit campground!!");
    return res.redirect(`/campgrounds/${camp.id}`)
  }
  const updatedCamp = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true, new: true });
  req.flash('success', `Successfully updated ${updatedCamp.title} Campground!`);
  res.redirect(`/campgrounds/${updatedCamp._id}`)
}))

//DESTROY
//Delete route to find a specific instance of one campground and remove that camp and all its data from the database.
router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findByIdAndDelete(id);
  req.flash('success', `Successfully deleted Campground!`)
  res.redirect('/campgrounds')
}))

module.exports = router;

