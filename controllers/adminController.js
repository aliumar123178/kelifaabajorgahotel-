const bcrypt = require('bcrypt');
const db = require('../db/connection');

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM admins WHERE username = ?', [username], async (err, results) => {
    if (err || results.length === 0) return res.json({ success: false });
    const match = await bcrypt.compare(password, results[0].password);
    res.json({ success: match });
  });
};

exports.getBookings = (req, res) => {
  db.query(`
    SELECT u.firstname, u.lastname, u.phone, b.roomId, b.photo, b.receipt, b.created_at
    FROM bookings b JOIN users u ON b.user_id = u.id
    ORDER BY b.created_at DESC
  `, (err, rows) => {
    if (err) return res.status(500).json({ success: false });
    res.json(rows);
  });
};
