const express = require('express');
const router = express.Router(); // ✅ THIS IS MANDATORY

const multer = require('multer');
const path = require('path');
const { createBooking, autoApprove } = require('../controllers/bookingController');
const validateImage = require('../middlewares/validateImageQuality');

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Route for booking
router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
    { name: 'receipt', maxCount: 1 }
  ]),
  validateImage,
  autoApprove,
  createBooking
);

// Export the router
module.exports = router;
