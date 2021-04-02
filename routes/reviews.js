const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utilities/catchAsync');
const Campground = require('../models/campgrounds');
const Review = require('../models/review');
const { validateReview } = require('../middleware')

router.post('/', validateReview, catchAsync(async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id)
  const review = new Review(req.body.review)
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', `Thanks for the review!`)
  res.redirect(`/campgrounds/${campground.id}`);
}))

router.delete('/:reviewId', catchAsync(async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //this removes from an existing array all instances of a value that matches the condition
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', `Successfully deleted review!`)
  res.redirect(`/campgrounds/${id}`);
}))

module.exports = router;