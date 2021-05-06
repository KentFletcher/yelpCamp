# YelpCamp

## Live deployment
Check out our app out in the wild [here](https://kentfletch-yelp-camp.herokuapp.com/)!

-----------

**Author**: Kent Sheats

**Version**: 1.0.0

----------------------------

## Overview
### What is the vision of this project?
YelpCamp is an application that will allow users to rate and view others rating and descriptions of campgrounds around the US.  
## What pain point does this web application solve?
It is difficult to get a real feel for a campground from the owner/operators description, they often offer poor web services or over state their offerings.  
## Why should we care about your web application?
As an avid camper this is something that I find very desirable and informative.Having the insight of others who have visited and experienced these places adds a lot of weight and offers great value to making an informed decision.

---------------

## Getting Started

-----------
This project is licensed under the free MIT license. As such, if you are interested in getting a version of this project locally for testing or added development, here are the steps needed to get started:

1. Prerequisites:
Knowledge of HTML, CSS and JavaScript
Experience working with node.js servers
Understanding of server-side templating
Working knowledge of REST APIs
A text editor (VSCode is recommended)
A web browser (We recommend using Google Chrome)
A desire to build cool stuff!
2. Clone repo from GitHub here.(Add a link to GH Repo)
On the GitHub repo page, click the clone or download button and copy the provided url.
In your command-line, or CLI, run this command: git clone https://github.com/KentFletcher/yelpCamp.git
3. Inside of the repo on your local machine, install the necessary dependencies and libraries:
  - In your CLI, run the command npm init which will initialize the project with node.js. If you don't have npm package manager installed, you can download node.js [here](https://nodejs.org/en/) which includes npm.
  - Follow the prompts to fill out the package.json file that node.js will pull from to run the server.
Important! 
  - Install these libraries from npm that are used on this project with the npm install command on your CLI (more info below):
    - @mapbox/mapbox-sdk: ^0.12.1
    - axios: ^0.21.1
    - cloudinary: ^1.25.1
    - connect-flash: ^0.1.1
    - connect-mongo: ^4.4.1
    - dotenv: ^8.2.0
    - ejs: ^3.1.6
    - ejs-mate: ^3.0.0
    - express: ^4.17.1
    - express-mongo-sanitize: ^2.0.2
    - express-session: ^1.17.1
    - helmet: ^4.5.0
    - joi: ^17.4.0
    - method-override: ^3.0.0
    - mongoose: ^5.11.17
    - multer: ^1.4.2
    - multer-storage-cloudinary: ^4.0.0
    - passport: ^0.4.1
    - passport-local: ^1.0.0
    - passport-local-mongoose: ^6.1.0
    - sanitize-html: ^2.3.3

You should now have a full copy of this project on your local machine.

## Architecture
------------
### Technologies used in this project
- HTML - A standard markup language used for web site structure.
- CSS - A simple language used to add styling to web documents.
- JavaScript - A dynamically typed programming language used heavily in front-end development.
- [Bootstrap](https://getbootstrap.com/docs/5.0/getting-started/introduction/) - Framework for fast-tracking styling and building responsive, mobile-first sites, quickly and easily.
- [Heroku](https://devcenter.heroku.com/) - Used to deploy the application.
- [MongoDB](https://www.mongodb.com/) - NoSQL database, MongoDB is a general purpose, document-based, distributed database built for modern application developers and for the cloud era.
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/lp/try2?utm_source=google&utm_campaign=gs_americas_united_states_search_core_brand_atlas_desktop&utm_term=atlas%20mongodb&utm_medium=cpc_paid_search&utm_ad=e&utm_ad_campaign_id=12212624338&gclid=Cj0KCQjwp86EBhD7ARIsAFkgakji0UN1Ge1bTKJc8MCYou_veTvNiz6FQ8UKCOUwJulV5upTLMGCGbMaAjEoEALw_wcB) - Cloud-hosted MongoDB service
- [Node.js](https://nodejs.org/en/) JavaScript environment, web application framework, that is used to build server-side applications
  - The following Node.js dependencies:
    - [@mapbox/mapbox-sdk](https://github.com/mapbox/mapbox-sdk-js): ^0.12.1 - Used to access the mapbox api
    - [axios](https://www.npmjs.com/package/axios): ^0.21.1 - Promise based HTTP client for the browser and node.js, used to make api requests.
    - [cloudinary](https://cloudinary.com/documentation): ^1.25.1 - Used to store images
    - [connect-flash](https://www.npmjs.com/package/connect-flash): ^0.1.1 -The flash is a special area of the session used for storing messages. Messages are written to the flash and cleared after being displayed to the user.
    - [connect-mongo](https://www.npmjs.com/package/connect-mongo): ^4.4.1 - Used to connect the application to MongoDB
    - [dotenv](https://www.npmjs.com/package/dotenv): ^8.2.0 - Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
    - [ejs](https://www.npmjs.com/package/ejs): ^3.1.6 - EJS is a simple templating language that lets you generate HTML markup with plain JavaScript. 
    - [ejs-mate](https://www.npmjs.com/package/ejs-mate): ^3.0.0 - Allows for layout to be utilized, used to create a boilerplate that was great to cut down on redundant code.
    - [express](http://expressjs.com/): ^4.17.1 - Fast, unopinionated, minimalist web framework for node.
    - [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize): ^2.0.2 - Middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection
    - [express-session](https://www.npmjs.com/package/express-session): ^1.17.1 - Middleware that handles all things for session, i.e., creating the session, setting the session cookie and creating the session object in req object.
    - [helmet](https://www.npmjs.com/package/helmet): ^4.5.0 - Used to help secure the Express app by setting various HTTP headers. Helps to prevent attacks like Cross-Site-Scripting(XSS), clickjacking, etc.
    - [joi](https://www.npmjs.com/package/joi): ^17.4.0 - The most powerful schema description language and data validator for JavaScript. Provides methods to easily validate common data types, such as e-mail addresses and phone numbers.
    - [method-override](https://www.npmjs.com/package/method-override): ^3.0.0 - Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
    - [mongoose](https://mongoosejs.com/): ^5.11.17 - It is a MongoDB object modeling tool, library,  designed to work in an asynchronous environment. Mongoose supports both promises and callbacks. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.
    - [multer](https://www.npmjs.com/package/multer): ^1.4.2 - Middleware for handling multipart/form-data, which is used for uploading files.
    - [multer-storage-cloudinary](https://www.npmjs.com/package/multer-storage-cloudinary): ^4.0.0 - A multer storage engine for Cloudinary.
    - [passport](https://www.npmjs.com/package/passport): ^0.4.1 - An authentication middleware, its sole purpose is to authenticate requests, which it does through an extensible set of plugins known as strategies.
    - [passport-local](https://www.npmjs.com/package/passport-local): ^1.0.0 - Passport strategy, module that lets you authenticate using a username and password in your Node.js applications.
    - [passport-local-mongoose](https://www.npmjs.com/package/passport-local-mongoose): ^6.1.0 - Is a is a Mongoose plugin that simplifies building username and password login with Passport.
    - [sanitize-html](https://www.npmjs.com/package/sanitize-html): ^2.3.3 - Used with joi to strip any html tags that are entered in, main goal is to avoid a user entering in something like a script into a form and skirting our validators.

### APIs
- [National Park Service](https://www.nps.gov/subjects/developer/index.htm) - Utilitzed to seed the database with actual National Park campgrounds.
- [Mapbox](https://docs.mapbox.com/) - for map displays


----------------------
## Project Scope
### What will your product do
- Allow users to:
  - Create a username and password
    - Sign in and log out
  - Select campsites to view
  - View others reviews 
  - Add reviews to campgrounds, if they are signed in
  - Delete their own reviews
  - Create new campgrounds
  - Edit campgrounds that they have created

### What will the product not do
This web application will not directly sell any of the reservations and will not charge for the use of our product.
### Minimum Viable Product
The user will be able to:
- create an account with a username and password
- search for campsites
- view others review
- add review

## User Stories:
User Profiles -  
- I, as a user, would like the site I interact with often to remember my settings and choices.
  - Create a sign-in/up form which saves a user profile 
  - Can save and recall/sign-in a user

## Credits and Collaborations
- Instructors for [Udemy Web Developer Bootcamp 2021](https://www.udemy.com/course/the-web-developer-bootcamp/) course:
  - [Colt Steele](https://www.udemy.com/user/coltsteele/)- Lead Instructor and mastermind of this project. Super easy to learn from and great at explaining why he is taking the approach that he is, and that there are generally many approaches that may be just as good or better.
  - [Ian Schoonover](https://www.udemy.com/user/ianschoonover/) - TA - Found his answers on the Q&A for the course very helpful and insightful.
  - [Zarko Maslaric](https://www.udemy.com/user/zarko-maslaric/) - - TA - Also his answers on the Q&A for the course were very helpful and insightful, helped me out many times when attempting to debug issues as the arose.
- Images were sourced from [Unsplash](https://unsplash.com/)
  - Some of the images that were used:
    - [Chilling in Georgia](https://unsplash.com/photos/re2LZOB2XvY) - by [Dominik Jirovský](https://unsplash.com/@dominik_jirovsky)
    - [Amazing camping spot on a mountain with views](https://unsplash.com/photos/JQfYGhUcDSg)
    - [Night Sky](https://unsplash.com/photos/V7uP-XzqX18) by [Pars Sahin](https://unsplash.com/@byadoniaa)
    - [Cliffside at sunset](https://unsplash.com/photos/MOlpybSipc8) - by [Rémy Groleau](https://unsplash.com/@remleau)

