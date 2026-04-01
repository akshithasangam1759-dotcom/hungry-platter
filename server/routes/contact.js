const router = require('express').Router();
const db = require('../config/db');
const nodemailer = require('nodemailer');
const { auth, adminOnly } = require('../middleware/auth');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ message: 'All fields required' });
  try {
    await db.query('INSERT INTO contact_messages (name,email,message) VALUES (?,?,?)', [name, email, message]);

    if (process.env.ADMIN_EMAIL && process.env.EMAIL_USER) {
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: `New Contact from ${name} - Hungry Platter`,
          html: `<h3>New Contact Message</h3><p><b>From:</b> ${name} (${email})</p><p><b>Message:</b></p><p>${message}</p>`
        });
      } catch (e) { console.log('Email failed:', e.message); }
    }

    res.json({ message: 'Message sent successfully!' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM contact_messages ORDER BY created_at DESC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
