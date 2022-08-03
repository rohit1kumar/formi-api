const express = require('express');
const router = express.Router();
const { createEvent, getEvent, removeEvent } = require('../controllers/event');
const verifyAuth = require('../middleware/verifyAuth');

router.get('/', verifyAuth, getEvent); //FETCH ALL EVENTS

router.post('/', verifyAuth, createEvent); // CREATE A EVENT WTIH NAME, DESC, DATE, ARTIST, LOCATION, AND TYPE 

router.delete('/:id', verifyAuth, removeEvent); // DELETE A EVENT BY ID


module.exports = router;