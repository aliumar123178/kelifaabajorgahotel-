const express = require('express');
const router = express.Router();
const { login, getBookings } = require('../controllers/adminController');

router.post('/login', login);
router.get('/bookings', getBookings);

module.exports = router;
