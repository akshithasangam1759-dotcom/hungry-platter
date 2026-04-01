const router = require('express').Router();
const db = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Place order
router.post('/', async (req, res) => {
  const { customer_name, customer_email, customer_phone, items, total_amount, order_type, notes } = req.body;
  if (!customer_name || !items || !total_amount)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const userId = req.user?.id || null;
    const [result] = await db.query(
      'INSERT INTO orders (user_id,customer_name,customer_email,customer_phone,items,total_amount,order_type,notes) VALUES (?,?,?,?,?,?,?,?)',
      [userId, customer_name, customer_email || '', customer_phone || '', JSON.stringify(items), total_amount, order_type || 'dine-in', notes || '']
    );

    // Send confirmation email
    if (customer_email && process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        // Create transporter here so it always uses latest env vars
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        const itemList = items
          .map(i => `<tr>
            <td style="padding:8px;border-bottom:1px solid #333">${i.name}</td>
            <td style="padding:8px;border-bottom:1px solid #333">x${i.quantity}</td>
            <td style="padding:8px;border-bottom:1px solid #333">₹${i.price * i.quantity}</td>
          </tr>`)
          .join('');

        await transporter.sendMail({
          from: `"Hungry Platter 🍽️" <${process.env.EMAIL_USER}>`,
          to: [customer_email, process.env.ADMIN_EMAIL].filter(Boolean),
          subject: '🍽️ Order Confirmed - Hungry Platter',
          html: `
            <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;background:#1a1a1a;color:#fff;padding:30px;border-radius:10px">
              <h1 style="color:#f5a623;text-align:center">🍽️ Hungry Platter</h1>
              <h2 style="color:#fff">Thank you, ${customer_name}!</h2>
              <p>Your order <strong>#${result.insertId}</strong> has been placed successfully.</p>
              <table style="width:100%;border-collapse:collapse;margin:20px 0">
                <thead>
                  <tr style="background:#f5a623;color:#000">
                    <th style="padding:10px;text-align:left">Item</th>
                    <th style="padding:10px;text-align:left">Qty</th>
                    <th style="padding:10px;text-align:left">Price</th>
                  </tr>
                </thead>
                <tbody>${itemList}</tbody>
              </table>
              <h3 style="color:#f5a623">Total: ₹${total_amount}</h3>
              <p style="color:#aaa">Order Type: ${order_type || 'dine-in'}</p>
              ${notes ? `<p style="color:#aaa">Notes: ${notes}</p>` : ''}
              <hr style="border-color:#333;margin:20px 0"/>
              <p style="color:#aaa;text-align:center">Visit us at Bachupally, Hyderabad 🏠</p>
            </div>
          `
        });

        console.log('✅ Order confirmation email sent to:', customer_email);
      } catch (mailErr) {
        console.error('❌ Email failed:', mailErr.message);
        // Don't fail the order just because email failed
      }
    }

    res.json({ id: result.insertId, message: 'Order placed successfully' });
  } catch (e) {
    console.error('Order error:', e.message);
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