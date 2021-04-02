const { campgroundSchema } = require("./schemas");
const Campground = require('./routes/campgrounds')

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.returnToUrl = req.originalUrl;
    req.flash('error', "You must sign in first!!");
    return res.redirect('/login');
  }
  next();
}

// module.exports.isAuthorLoggedIn = async (req, res, next) => {
//   const { id } = req.params;
//   const campground = await Campground.findById(id)
//   if (!camp.author.equals(req.user._id)) {
//     req.flash('error', "Only the author can edit campground!!");
//     return res.redirect(`/campgrounds/${campground.id}`)
//   }
// }