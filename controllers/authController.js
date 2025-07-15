const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const db = require('../db/connection');

exports.register = async (req, res) => {
  const { firstname, lastname, email, phone, country, region, kebele, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  db.query(
    'INSERT INTO users (firstname, lastname, email, phone, country, region, kebele, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
    [firstname, lastname, email, phone, country, region, kebele, hashed],
    (err) => {
      if (err) return res.status(500).json({ success: false, error: err });
      res.json({ success: true });
    }
  );
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, results) => {
    if (err || results.length === 0) return res.json({ success: false });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    res.json({ success: match });
  });
};
