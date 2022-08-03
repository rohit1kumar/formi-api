const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        trim: true,
        tolowercase: true,
    },
    desc: {
        type: String,
        required: [true, 'Please provide description '],
        trim: true,
        tolowercase: true
    },
    date: {
        type: Date,
        required: [true, 'Please provide date'],
        trim: true,
        tolowercase: true
    },
    artist: {
        type: String,
        required: [true, 'Please provide artist name'],
        trim: true,
        tolowercase: true
    },
    location: {
        type: String,
        required: [true, 'Please provide location'],
        trim: true,
        tolowercase: true
    },
    type: {
        type: String,
        required: [true, 'Please provide type of event'],
        enum: {
            values: ['EDM', 'Hip-Hop'],
            message: 'Type is either EDM or Hip-Hop'
        },
        trim: true,
        tolowercase: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

const Event = mongoose.model('Event', EventSchema);

module.exports = { Event };

