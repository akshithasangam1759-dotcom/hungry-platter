const router = require('express').Router();
const db = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Create reservation
router.post('/', async (req, res) => {
  const { name, email, phone, date, time, guests, special_requests } = req.body;
  if (!name || !phone || !date || !time || !guests)
    return res.status(400).json({ message: 'All fields required' });

  try {
    const userId = req.user?.id || null;
    const [result] = await db.query(
      'INSERT INTO reservations (user_id,name,email,phone,date,time,guests,special_requests) VALUES (?,?,?,?,?,?,?,?)',
      [userId, name, email || '', phone, date, time, guests, special_requests || '']
    );

    if (email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        // Create transporter here so it always uses latest env vars
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({
          from: `"Hungry Platter 🍽️" <${process.env.EMAIL_USER}>`,
          to: [email, process.env.ADMIN_EMAIL].filter(Boolean),
          subject: '🍽️ Table Reserved - Hungry Platter',
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#1a1a1a;color:#fff;padding:30px;border-radius:10px">
              <h1 style="color:#f5a623;text-align:center">🍽️ Hungry Platter</h1>
              <h2>Table Reserved, ${name}!</h2>
              <p>Your reservation details:</p>
              <table style="width:100%;border-collapse:collapse;margin:20px 0">
                <tr style="border-bottom:1px solid #333">
                  <td style="padding:10px;color:#aaa">📅 Date</td>
                  <td style="padding:10px"><strong>${date}</strong></td>
                </tr>
                <tr style="border-bottom:1px solid #333">
                  <td style="padding:10px;color:#aaa">⏰ Time</td>
                  <td style="padding:10px"><strong>${time}</strong></td>
                </tr>
                <tr style="border-bottom:1px solid #333">
                  <td style="padding:10px;color:#aaa">👥 Guests</td>
                  <td style="padding:10px"><strong>${guests}</strong></td>
                </tr>
                ${special_requests ? `
                <tr>
                  <td style="padding:10px;color:#aaa">📝 Special Requests</td>
                  <td style="padding:10px"><strong>${special_requests}</strong></td>
                </tr>` : ''}
              </table>
              <p style="color:#aaa">Reservation held for <strong style="color:#fff">15 minutes</strong>. Please arrive on time!</p>
              <hr style="border-color:#333;margin:20px 0"/>
              <p style="color:#aaa;text-align:center">We look forward to welcoming you at Hungry Platter, Bachupally, Hyderabad! 🏠</p>
            </div>
          `
        });

        console.log('✅ Reservation email sent to:', email);
      } catch (mailErr) {
        console.error('❌ Reservation email failed:', mailErr.message);
      }
    }

    res.json({ id: result.insertId, message: 'Reservation confirmed!' });
  } catch (e) {
    console.error('Reservation error:', e.message);
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