const sharp = require('sharp');
const fs = require('fs');

module.exports = async (req, res, next) => {
  const fields = ['photo', 'idFront', 'idBack'];
  for (const field of fields) {
    if (req.files?.[field]) {
      const file = req.files[field][0];
      const path = file.path;

      try {
        const metadata = await sharp(path).metadata();

        // Check size
        const stats = fs.statSync(path);
        if (stats.size < 10000) {
          return res.status(400).json({ success: false, reason: `${field} is too small or unclear.` });
        }

        // Check image dimensions
        if (metadata.width < 400 || metadata.height < 400) {
          return res.status(400).json({ success: false, reason: `${field} is too blurry or small.` });
        }

        // Optional: Check orientation
        if (metadata.orientation && metadata.orientation !== 1) {
          return res.status(400).json({ success: false, reason: `${field} must be a straight photo.` });
        }

      } catch (err) {
        return res.status(400).json({ success: false, reason: `Invalid image for ${field}` });
      }
    }
  }

  next();
};
