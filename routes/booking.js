const validateImage = require('../middlewares/validateImageQuality');
router.post(
  '/',
  upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'idFront', maxCount: 1 },
    { name: 'idBack', maxCount: 1 },
    { name: 'receipt', maxCount: 1 }
  ]),
  validateImage, // 🟢 Add image validation here
  autoApprove,
  createBooking
);
