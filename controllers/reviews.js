const Campground = require('../models/campgrounds');
const Review = require('../models/review');

module.exports.createNewReview = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  const review = new Review(req.body.review);
  review.author = req.user._id;
  campground.reviews.push(review);
  await review.save();
  await campground.save();
  req.flash('success', `Thanks for the review!`);
  res.redirect(`/campgrounds/${campground.id}`);
}

module.exports.deleteReview = async (req, res, next) => {
  const { id, reviewId } = req.params;
  await Campground.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //this removes from an existing array all instances of a value that matches the condition
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', `Successfully deleted review!`);
  res.redirect(`/campgrounds/${id}`);
}