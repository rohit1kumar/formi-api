const mongoose = require('mongoose');
const validator = require('validator');


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email',
        },
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
});


const User = mongoose.model('User', UserSchema);

module.exports = { User };

