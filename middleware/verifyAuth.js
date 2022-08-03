require('dotenv').config();
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.JWT_SECRET;

// VERIFY TOKEN
const VerifyAuth = async (req, res, next) => {

    try {
        const { access_token } = req.cookies;

        if (access_token) {
            const decoded = await jwt.verify(access_token, jwt_secret);
            req.userId = decoded._id;   // save userId to req object
            next();
        } else {
            return res.status(401).json({
                status: 'error',
                message: 'Unauthorized! login first'
            });
        }

    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });

    }
};

module.exports = VerifyAuth;
