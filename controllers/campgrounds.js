const Campground = require('../models/campgrounds');

module.exports.index = async (req, res) => {
  const camps = await Campground.find({});
  res.render('campgrounds/index', { camps, title: 'All Campgrounds' });
}

module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new', { title: 'Add Campground' })
}

module.exports.createNewCampground = async (req, res) => {
  const newCampground = new Campground(req.body.campground);
  newCampground.author = req.user._id;
  await newCampground.save();
  req.flash('success', 'Thanks for adding a new campground!')
  res.redirect(`/campgrounds/${newCampground._id}`)
}

module.exports.showCampground = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id).populate({
    path: 'reviews',
    populate: {
      path: 'author'
    }
  }).populate('author');
  if (!camp) {
    req.flash('error', 'CANNOT FIND THAT CAMPGROUND')
    return res.redirect('/campgrounds')
  }
  res.render('campgrounds/show', { camp, title: camp.title })
}

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findById(id);
  if (!camp) {
    req.flash('error', 'CANNOT FIND THAT CAMPGROUND')
    return res.redirect('/campgrounds')
  }
  res.render('campgrounds/edit', { camp, title: `Update ${camp.title}` })
}

module.exports.editCampground = async (req, res) => {
  const { id } = req.params;
  const updatedCamp = await Campground.findByIdAndUpdate(id, { ...req.body.campground }, { runValidators: true, new: true });
  req.flash('success', `Successfully updated ${updatedCamp.title} Campground!`);
  res.redirect(`/campgrounds/${updatedCamp._id}`)
}

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findByIdAndDelete(id);
  req.flash('success', `Successfully deleted Campground!`)
  res.redirect('/campgrounds')
}