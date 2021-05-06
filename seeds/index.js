if (process.env.NODE_ENV !== 'production') {//checking to see if we are in development mode
    require('dotenv').config();//if we are in 'development' mode, then look in the .env file when prompted for sensitive variables
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');
const axios = require('axios');

//Db for development/ local db
// mongoose.connect('mongodb://localhost:27017/yelpCamp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelpCamp';
// Connect to mongo DB using mongoose-production db
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const seedDB = async () => {
    await Campground.deleteMany({});
    let npsCamps = await axios.get(`https://developer.nps.gov/api/v1/campgrounds?limit=600&api_key=${process.env.NPS_API_KEY}`);
    for (let res of npsCamps.data.data) {
        if (res.addresses.length > 0
            && parseInt(res.campsites.totalSites) > 0
            && res.latitude != ''
            && res.longitude != '') {
            const camp = new Campground({
                author: '60807ad488fc1094130478ce',//MY USER ID
                location: `${res.addresses[0].city}, ${res.addresses[0].stateCode}`,
                geometry: {
                    type: "Point",
                    coordinates: [
                        res.longitude,
                        res.latitude
                    ]
                },
                title: res.name,
                images:
                    [
                        {
                            url: 'https://res.cloudinary.com/dqas0e9l7/image/upload/v1619117349/YelpCamp/rssdt4zerlryqss7jlh1.jpg',
                            filename: 'YelpCamp/rssdt4zerlryqss7jlh1'
                        },
                        {
                            url: 'https://res.cloudinary.com/dqas0e9l7/image/upload/v1618857695/YelpCamp/tokybqnoslylm7ulcj37.jpg',
                            filename: 'YelpCamp/tokybqnoslylm7ulcj37'
                        }
                    ],
                description: res.description ? res.description : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nisi placeat! Illo ad voluptate dolorem tenetur et quidem quia blanditiis beatae, commodi in recusandae non, ipsum eos porro animi praesentium?',
                price: res.fees.length > 0 ? res.fees[0].cost : Math.floor(Math.random() * 20) + 10
            })
            await camp.save();
        }
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})