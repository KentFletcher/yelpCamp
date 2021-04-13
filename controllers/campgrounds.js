const Campground = require('../models/campgrounds');
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapboxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapboxToken });
const { cloudinary } = require('../cloudinary');



module.exports.index = async (req, res) => {
  const camps = await Campground.find({});
  res.render('campgrounds/index', { camps, title: 'All Campgrounds' });
}

module.exports.renderNewForm = (req, res) => {
  res.render('campgrounds/new', { title: 'Add Campground' })
}

module.exports.createNewCampground = async (req, res) => {
  const geoData = await geocoder.forwardGeocode({
    query: req.body.campground.location,
    limit: 1
  }).send()
  const campground = new Campground(req.body.campground);
  campground.geometry = geoData.body.features[0].geometry;
  campground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  campground.author = req.user._id;
  await campground.save();
  req.flash('success', 'Thanks for adding a new campground!')
  res.redirect(`/campgrounds/${campground._id}`)
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
  const images = req.files.map(f => ({ url: f.path, filename: f.filename }));
  updatedCamp.images.push(...images);
  await updatedCamp.save();
  if (req.body.deleteImages) { //Looks to see if there are any images that were selected and placed in the array too be deleted
    for (let filename of req.body.deleteImages) { //If there are images stored in the deleteImages array, loops over each image
      await cloudinary.uploader.destroy(filename); //removes the image that was stored to be deleted from the cloud storage on cloudinary
    }
    await updatedCamp.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })//then uses mongoose query operators to pull the images with the selected filenames from with in deleteImages array out of the mongo database
  }
  req.flash('success', `Successfully updated ${updatedCamp.title} Campground!`);
  res.redirect(`/campgrounds/${updatedCamp._id}`)
}

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const camp = await Campground.findByIdAndDelete(id);
  req.flash('success', `Successfully deleted Campground!`)
  res.redirect('/campgrounds')
}