const router = require('express').Router();
const db = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

// Place order
router.post('/', async (req, res) => {
  const { customer_name, customer_email, customer_phone, items, total_amount, order_type, notes } = req.body;
  if (!customer_name || !items || !total_amount) return res.status(400).json({ message: 'Missing required fields' });
  try {
    const userId = req.user?.id || null;
    const [result] = await db.query(
      'INSERT INTO orders (user_id,customer_name,customer_email,customer_phone,items,total_amount,order_type,notes) VALUES (?,?,?,?,?,?,?,?)',
      [userId, customer_name, customer_email || '', customer_phone || '', JSON.stringify(items), total_amount, order_type || 'dine-in', notes || '']
    );

    // Send confirmation email
    if (customer_email && process.env.EMAIL_USER) {
      const itemList = items.map(i => `${i.name} x${i.quantity} - ₹${i.price * i.quantity}`).join('\n');
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: [customer_email, process.env.ADMIN_EMAIL],
          subject: '🍽️ Order Confirmed - Hungry Platter',
          html: `<h2>Thank you, ${customer_name}!</h2><p>Your order #${result.insertId} has been placed.</p><pre>${itemList}</pre><p><strong>Total: ₹${total_amount}</strong></p><p>We'll prepare it soon. Visit us at Bachupally, Hyderabad!</p>`
        });
      } catch (mailErr) { console.log('Email failed:', mailErr.message); }
    }

    res.json({ id: result.insertId, message: 'Order placed successfully' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// Get user orders
router.get('/my', auth, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders WHERE user_id=? ORDER BY created_at DESC', [req.user.id]);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all orders (admin)
router.get('/', auth, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM orders ORDER BY created_at DESC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update order status (admin)
router.put('/:id/status', auth, adminOnly, async (req, res) => {
  const { status } = req.body;
  try {
    await db.query('UPDATE orders SET status=? WHERE id=?', [status, req.params.id]);
    res.json({ message: 'Status updated' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
