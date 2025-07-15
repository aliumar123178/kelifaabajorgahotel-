const express = require('express');
const router = express.Router();
const twilio = require('twilio');

// Simulated or real Twilio
const accountSid = process.env.TWILIO_SID || 'test_sid';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'test_token';
const fromPhone = process.env.TWILIO_PHONE || '+251911000000';

const client = twilio(accountSid, authToken);

router.post('/send', async (req, res) => {
  const { to, message } = req.body;

  if (process.env.USE_REAL_SMS === 'true') {
    try {
      await client.messages.create({
        body: message,
        from: fromPhone,
        to: to
      });
      return res.json({ success: true, simulated: false });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
  } else
