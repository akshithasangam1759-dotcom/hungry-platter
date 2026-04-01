const router = require('express').Router();
const db = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

// Dashboard stats
router.get('/stats', auth, adminOnly, async (req, res) => {
  try {
    const [[{ total_orders }]] = await db.query('SELECT COUNT(*) as total_orders FROM orders');
    const [[{ total_revenue }]] = await db.query('SELECT COALESCE(SUM(total_amount),0) as total_revenue FROM orders WHERE status != "cancelled"');
    const [[{ total_reservations }]] = await db.query('SELECT COUNT(*) as total_reservations FROM reservations');
    const [[{ total_users }]] = await db.query('SELECT COUNT(*) as total_users FROM users WHERE role="customer"');
    const [[{ pending_orders }]] = await db.query('SELECT COUNT(*) as pending_orders FROM orders WHERE status="pending"');
    // 👇 Add these two
    const [[{ total_logins }]] = await db.query('SELECT COUNT(*) as total_logins FROM login_logs WHERE status="success"');
    const [[{ failed_logins }]] = await db.query('SELECT COUNT(*) as failed_logins FROM login_logs WHERE status="failed"');

    res.json({ total_orders, total_revenue, total_reservations, total_users, pending_orders, total_logins, failed_logins });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all users
router.get('/users', auth, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id,name,email,role,phone,created_at FROM users ORDER BY created_at DESC');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// 👇 New endpoint - Get all login logs
router.get('/login-logs', auth, adminOnly, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM login_logs ORDER BY login_time DESC LIMIT 100'
    );
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;