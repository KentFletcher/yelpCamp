const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campgrounds');
const { campgroundSchema } = require('../schemas.js');
const { Router } = require('express');
const { isLoggedIn, validateCampground, isAuthor } = require('../middleware');
const campgrounds = require('../controllers/campgrounds')

//Campground routes
router.get('/', catchAsync(campgrounds.index))

//CREATE
//serve form to create the new campground
router.get('/new', isLoggedIn, campgrounds.renderNewForm)

//POST route where the form from new route will be submitted. Then create the new campground, insert into the database, then redirect and display the newly created instance, validateCampground is the server-side error handler 
router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createNewCampground))

//READ
// SHOW route for individual campgrounds
router.get('/:id', catchAsync(campgrounds.showCampground))

//UPDATE 
//GET route to render the new form for updating the information
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

//PUT route for changing/updating data about a single/specific campground, then insert into the database, and then redirect and display the newly updated instance 
router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.editCampground))

//DESTROY
//Delete route to find a specific instance of one campground and remove that camp and all its data from the database.
router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

module.exports = router;

