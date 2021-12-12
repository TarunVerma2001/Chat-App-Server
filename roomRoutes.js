const express = require('express');

const roomController = require('./roomController');
const router = express.Router();

router.post('/createRoom', roomController.create_room);
// router.post('')

module.exports = router;
