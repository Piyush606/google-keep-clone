const mongoose = require('mongoose')
const { Schema } = mongoose

const UserSchema = new Schema({
    name: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('user', UserSchema);

// Not necessary to write this way. Logic for this is written in auth
// User.createIndexes();           // ensures that duplicates are not stored in DB
module.exports = User