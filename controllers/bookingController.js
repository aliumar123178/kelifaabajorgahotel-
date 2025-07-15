const db = require('../db/connection');

exports.createBooking = (req, res) => {
  const { firstname, lastname, region, kebele, country, travelFrom, travelTo, roomId } = req.body;
  const user_id = 1; // replace with real session/auth ID

  db.query(
    `INSERT INTO bookings (user_id, roomId, photo, idFront, idBack, receipt, travelFrom, travelTo)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      user_id,
      roomId,
      req.files.photo?.[0].filename,
      req.files.idFront?.[0].filename,
      req.files.idBack?.[0].filename,
      req.files.receipt?.[0].filename,
      travelFrom,
      travelTo
    ],
    (err) => {
      if (err) return res.status(500).json({ success: false, error: err });
      res.json({ success: true });
    }
  );
};
