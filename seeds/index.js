if (process.env.NODE_ENV !== 'production') {//checking to see if we are in development mode
    require('dotenv').config();//if we are in 'development' mode, then look in the .env file when prompted for sensitive variables
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campgrounds');
const axios = require('axios');
// const multer = require('multer');
// const { storage } = require('../cloudinary');
// const upload = multer({ storage });

// mongoose.connect('mongodb://localhost:27017/yelpCamp', {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
// });

const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/yelpCamp';
//Connect to mongo DB using mongoose
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

// const sample = array => array[Math.floor(Math.random() * array.length)];
// const price = Math.floor(Math.random() * 20) + 10;

// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 300; i++) {
//         const random1000 = Math.floor(Math.random() * 1000);
//         const price = Math.floor(Math.random() * 20) + 10;
//         const camp = new Campground({
//             author: '606489509a9442749785a711',//MY USER ID
//             location: `${cities[random1000].city}, ${cities[random1000].state}`,
//             geometry: {
//                 type: "Point",
//                 coordinates: [
//                     cities[random1000].longitude,
//                     cities[random1000].latitude
//                 ]
//             },
//             title: `${sample(descriptors)} ${sample(places)}`,
//             images: [
//                 {
//                     url: 'https://res.cloudinary.com/dqas0e9l7/image/upload/v1617917658/YelpCamp/zkn03xj5ypmlzqv6ciww.jpg',
//                     filename: 'YelpCamp/zkn03xj5ypmlzqv6ciww'
//                 },
//                 {
//                     url: 'https://res.cloudinary.com/dqas0e9l7/image/upload/v1617927985/YelpCamp/gvypejgvmzbtcqdsbpde.jpg',
//                     filename: 'YelpCamp/gvypejgvmzbtcqdsbpde'
//                 }
//             ],
//             description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, nisi placeat! Illo ad voluptate dolorem tenetur et quidem quia blanditiis beatae, commodi in recusandae non, ipsum eos porro animi praesentium?',
//             price
//         })
//         await camp.save();
//     }
// }

// axios.get(`https://developer.nps.gov/api/v1/campgrounds?limit=10&api_key=${process.env.NPS_API_KEY}`)
//     .then((resp) => {
//         console.log(typeof resp.data.data[0].images[0].url)
//     })

const seedDB = async () => {
    await Campground.deleteMany({});
    let npsCamps = await axios.get(`https://developer.nps.gov/api/v1/campgrounds?limit=600&api_key=${process.env.NPS_API_KEY}`);

    for (let res of npsCamps.data.data) {
        if (res.addresses.length > 0 && parseInt(res.campsites.totalSites) > 0 && res.latitude != '' && res.longitude != '') {
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
                    // res.images[0].url ? res.images[0].map(f => ({ url: f.path, filename: f.filename })) :
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