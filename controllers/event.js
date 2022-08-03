const { Event } = require('../models/event');
const handleError = require('../middleware/error-handler');
/*
FIND ALL EVENT IN DB IF NO PARAMETER IS PASSED
ELSE FIND EVENT BY NAME, ARTIST AND LOCATION
*/
const getEvent = async (req, res) => {
    try {
        let data;
        let { page, limit, name, location, artist } = req.query;

        page = parseInt(page);
        limit = parseInt(limit);


        if (!page || page < 1) {
            page = 1;    // default page is 1
        }
        if (!limit || limit < 5) {
            limit = 10;   // default limit is 10
        }
        const skip = (page - 1) * limit;

        /* NO PARAMETER IS PASSED */
        if (!name && !location && !artist) {
            data = await Event
                .find({})
                .populate('createdBy', '-_id -__v -password -email')
                .select({ __v: 0 }).skip(skip).limit(limit);
        }
        /*IF NAME IS APPLIED*/
        if (name) {
            data = await Event
                .find({
                    name: { $regex: name, $options: 'i' },
                })
                .populate('createdBy', '-_id -__v -password -email')
                .select({ __v: 0 }).skip(skip).limit(limit);
        }

        /*IF LOCATION IS APPLIED*/
        if (location) {
            data = await Event
                .find({
                    location: { $regex: location, $options: 'i' }
                })
                .populate('createdBy', '-_id -__v -password -email')
                .select({ __v: 0 }).skip(skip).limit(limit);
        }

        /*IF ARTIST IS APPLIED*/
        if (artist) {
            data = await Event
                .find({
                    artist: { $regex: artist, $options: 'i' }
                })
                .populate('createdBy', '-_id -__v -password -email')
                .select({ __v: 0 }).skip(skip).limit(limit);
        }

        /*IF NAME, LOCATION, AND ARITST IS APPIELD*/
        if (name && location && artist) {
            data = await Event
                .find({
                    name: { $regex: name, $options: 'i' },
                    location: { $regex: location, $options: 'i' },
                    artist: { $regex: artist, $options: 'i' }
                })
                .populate('createdBy', '-_id -__v -password -email')
                .select({ __v: 0 }).skip(skip).limit(limit);
        }

        /*IF NAME AND LOCATION IS APPLIED*/
        if (name && location) {
            data = await Event
                .find({
                    name: { $regex: name, $options: 'i' },
                    location: { $regex: location, $options: 'i' }
                }).populate('createdBy', '-_id -__v -password -email')
                .select({ __v: 0 }).skip(skip).limit(limit);
        }

        /*IF NAME AND ARTIST IS APPLIED*/
        if (name && artist) {
            data = await Event
                .find({
                    name: { $regex: name, $options: 'i' },
                    artist: { $regex: artist, $options: 'i' }
                }).populate('createdBy', '-_id -__v -password -email')
                .select({ __v: 0 }).skip(skip).limit(limit);
        }

        /*IF LOCATION AND ARTIST IS APPLIED*/
        if (location && artist) {
            data = await Event
                .find({
                    location: { $regex: location, $options: 'i' },
                    artist: { $regex: artist, $options: 'i' }
                }).populate('createdBy', '-_id -__v -password -email')
                .select({ __v: 0 }).skip(skip).limit(limit);
        }

        const total = data.length;
        const pagination = {
            total,
            page,
            limit
        };

        return res.status(200).json({
            status: 'success',
            events: total > 0 ? data : 'No event found', // if data is not empty, return data, else return 'No event found'
            pagination
        });
    }
    catch (err) {
        res.status(400).json({
            status: 'error',
            error: err.message
        });
    }
};

/*
 CREATE A EVENT WTIH NAME, DESC, 
 DATE, ARTIST, LOCATION, AND TYPE
 */
const createEvent = async (req, res) => {
    let { name, desc, date, artist, location, type } = req.body;

    try {
        const data = await Event.create({
            name,
            desc,
            date,
            artist,
            location,
            type,
            createdBy: req.userId
        });

        return res.status(201).json({
            status: 'success',
            message: 'Event created successfully',
            event: data
        });
    }
    catch (error) {
        return res.status(400).json({
            status: 'error',
            error: handleError(error)
        });
    }
};

/* 
DELETE A EVENT BY ID 
*/
const removeEvent = async (req, res) => {
    let { id } = req.params;
    try {
        const data = await Event.findByIdAndRemove(id);
        if (!data) {
            return res.status(404).json({
                status: 'error',
                error: 'Event not found'
            });
        }

        return res.status(200).json({
            status: 'success',
            message: 'Event removed successfully',
        });
    }
    catch (err) {
        return res.status(500).json({
            status: 'error',
            error: err.message
        });
    }
};

module.exports = { getEvent, createEvent, removeEvent };



