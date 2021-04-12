const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String
});

imageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200');
});

imageSchema.virtual('showImage').get(function () {
  return this.url.replace('/upload', '/upload/w_636,h_424,c_fill,g_auto:subject');
});

const campgroundSchema = new Schema({
  title: String,
  images: [imageSchema],
  price: String,
  description: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Review'
    }
  ]
});

//Middleware - Removes the reviews associated with a given campground from the DB when the campground is deleted
//POST, after a campground is deleted this function goes into the reviews array and removes all of those reviews from the Review model in the database.  
campgroundSchema.post('findOneAndDelete', async function (camp) {
  if (camp.reviews.length) {
    await Review.deleteMany({
      _id: { $in: camp.reviews }
    })//in operator looks within an array
  }
})

const Campground = mongoose.model('Campground', campgroundSchema);
module.exports = Campground;









