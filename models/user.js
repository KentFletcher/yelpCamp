const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  }
})

//This is going to add on to our UserSchema a field for username and password, making sure that those are unique and not duplicated. It will also give use access to some additional methods that we can use.
UserSchema.plugin(passportLocalMongoose);

const User = mongoose.model('User', UserSchema);

module.exports = User;

// module.exports = mongoose.model('User', UserSchema); ???Not working as a one-liner
