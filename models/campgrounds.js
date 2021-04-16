const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;

const imageSchema = new Schema({
  url: String,
  filename: String
});

imageSchema.virtual('thumbnail').get(function () {
  return this.url.replace('/upload', '/upload/w_200,c_thumb,h_150,g_auto:subject');
});

imageSchema.virtual('showImage').get(function () {
  return this.url.replace('/upload', '/upload/w_636,h_424,c_fill,g_auto:subject');
});

const opts = { toJSON: { virtuals: true } };

const campgroundSchema = new Schema({
  title: String,
  images: [imageSchema],
  geometry: {
    type: {
      type: String,
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
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
}, opts);

campgroundSchema.virtual('properties.popUpMarkup').get(function () {
  return `<h4><a href="/campgrounds/${this._id}">${this.title}</a></h4> <h5>${this.location}</h5>`;
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









