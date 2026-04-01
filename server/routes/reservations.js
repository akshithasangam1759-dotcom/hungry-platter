const router = require('express').Router();
const db = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// Create reservation
router.post('/', async (req, res) => {
  const { name, email, phone, date, time, guests, special_requests } = req.body;
  if (!name || !phone || !date || !time || !guests) return res.status(400).json({ message: 'All fields required' });
  try {
    const userId = req.user?.id || null;
    const [result] = await db.query(
      'INSERT INTO reservations (user_id,name,email,phone,date,time,guests,special_requests) VALUES (?,?,?,?,?,?,?,?)',
      [userId, name, email || '', phone, date, time, guests, special_requests || '']
    );

    if (email && process.env.EMAIL_USER) {
      try {
        await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: [email, process.env.ADMIN_EMAIL],  // ← sends to customer AND restaurant
  subject: '🍽️ Table Reserved - Hungry Platter',
  html: `<h2>Table Reserved, ${name}!</h2>
    <p>Your reservation details:</p>
    <ul>
      <li>Date: ${date}</li>
      <li>Time: ${time}</li>
      <li>Guests: ${guests}</li>
    </ul>
    <p>We look forward to welcoming you at Hungry Platter, Bachupally!</p>`
});
      } catch (mailErr) { console.log('Email failed:', mailErr.message); }
    }

    res.json({ id: result.insertId, message: 'Reservation confirmed!' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// Get all reservations (admin)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations ORDER BY date DESC, time DESC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update reservation status (admin)
router.put('/:id/status', auth, adminOnly, async (req, res) => {
  const { status } = req.body;
  try {
    await db.query('UPDATE reservations SET status=? WHERE id=?', [status, req.params.id]);
    res.json({ message: 'Status updated' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
