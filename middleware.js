const { campgroundSchema, reviewSchema } = require("./schemas");
const Campground = require('./models/campgrounds');
const ExpressError = require('./utilities/ExpressError');
const catchAsync = require('./utilities/catchAsync');

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnToUrl = req.originalUrl;
    req.flash('error', "You must sign in first!!");
    return res.redirect('/login');
  }
  next();
}

//Middleware to handle server-side validation
module.exports.validateCampground = (req, res, next) => {
  const { error } = campgroundSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(ele => ele.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}

module.exports.isAuthor = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
  if (!campground.author.equals(req.user._id)) {
    req.flash('error', "Only the author can edit campground!!");
    return res.redirect(`/campgrounds/${id}`)
  }
  next();
})

//middleware to handle server-side validation
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    console.log(error)
    const msg = error.details.map(ele => ele.message).join(',')
    throw new ExpressError(msg, 400)
  } else {
    next()
  }
}