const express = require('express');
const router = express.Router();
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campgrounds');
const { campgroundSchema, reviewSchema } = require('../schemas.js');
const { isLoggedIn, validateCampground, isAuthor, returnToPage } = require('../middleware');
const campgrounds = require('../controllers/campgrounds')
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createNewCampground))//route where the form from new route will be submitted. Then create the new campground, insert into the database, then redirect and display the newly created instance, validateCampground is the server-side error handler 

//CREATE
router.get('/new', isLoggedIn, campgrounds.renderNewForm)//serve form to create the new campground

router.route('/:id')
  .get(catchAsync(campgrounds.showCampground))//READ/ SHOW route for individual campgrounds
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.editCampground))//PUT route for editing/updating data about a single/specific campground, then insert into the database, and then redirect and display the newly updated instance 
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))//DESTROY/ Delete route to find a specific instance of one campground and remove that camp and all its data from the database.

//UPDATE 
//GET route to render the new form for updating the information
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm))

module.exports = router;

