require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');
const jwt_secret = process.env.JWT_SECRET;
const handleError = require('../middleware/error-handler');
const salt = 10;
const options = {
    expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days
    httpOnly: true
};

// LOGIN USER
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        // if user not found
        if (!user) {
            return res.status(401).send({
                status: 'error',
                message: 'user not found !',
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        // if password is wrong
        if (!isMatch) {
            return res.status(401).send({
                status: 'error',
                message: 'wrong password',
            });
        }
        // if everything is ok
        if (isMatch) {
            // generate token : user._id
            const token = jwt.sign({ _id: user._id }, jwt_secret, { expiresIn: '2d', });
            // send cookie to client
            res.status(200).cookie("access_token", token, options).json({
                status: 'success',
                message: 'logged-in successful',
            });
        }
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};

// REGISTER USER
const register = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        password = await bcrypt.hash(password, salt);    //hashing password
        await User.create({
            name,
            email,
            password
        });

        return res.status(200).send({
            status: 'success',
            message: 'user created successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: handleError(error)
        });
    }
};

// LOGOUT USER
const logout = async (req, res) => {
    try {
        res.clearCookie('access_token').status(200).json({
            status: 'success',
            message: 'logging out successful',
        });
    }
    catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message,
        });
    }
};


module.exports = { register, login, logout };
