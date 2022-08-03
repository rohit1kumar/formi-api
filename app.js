const express = require('express');
const app = express();

require('dotenv').config();
const helmet = require('helmet');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const rateLimiter = require('express-rate-limit');

// database
const connectDB = require('./db/connect');
// router   
const event = require('./routes/event');
const user = require('./routes/user');

//middleware
const notFound = require('./middleware/not-found');

app.use(rateLimiter({ windowMs: 15 * 60 * 1000, max: 60, }));  // 15 minutes max 60 requests per IP
app.use(helmet());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(express.json({ limit: "10kb" }));

app.use('/api/event', event);
app.use('/api/user', user);

app.use(notFound);

const url = process.env.MONGO_URI;
const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(url);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log("error:", error.message);
    }
};

start();