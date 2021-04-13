const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');

mongoose.connect('mongodb://localhost:27017/yelpCamp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '606489509a9442749785a711',//MY USER ID
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/dqas0e9l7/image/upload/v1617928421/YelpCamp/hej4sbae7h4wbldbpbf4.jpg',
                    filename: 'YelpCamp/hej4sbae7h4wbldbpbf4'
                },
                {
                    url: 'https://res.cloudinary.com/dqas0e9l7/image/upload/v1617928422/YelpCamp/reo8yr5gwgoy0uysup3u.jpg',
                    filename: 'YelpCamp/reo8yr5gwgoy0uysup3u'
                }
            ],
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nisi placeat! Illo ad voluptate dolorem tenetur et quidem quia blanditiis beatae, commodi in recusandae non, ipsum eos porro animi praesentium?',
            price,
            geometry: {
                type: "Point",
                coordinates: [-80.3256, 27.4467]
            }
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})