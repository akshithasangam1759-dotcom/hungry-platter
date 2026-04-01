const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

// Helper to safely log logins (won't crash if table doesn't exist)
async function logLogin(userId, username, ip, device, status) {
  try {
    await db.query(
      'INSERT INTO login_logs (user_id, username, ip_address, device_info, status) VALUES (?,?,?,?,?)',
      [userId, username, ip, device, status]
    );
  } catch (e) {
    console.warn('login_logs insert skipped:', e.message);
  }
}

// Register
router.post('/register', async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  try {
    const [existing] = await db.query('SELECT id FROM users WHERE email=?', [email]);
    if (existing.length)
      return res.status(400).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, phone) VALUES (?,?,?,?)',
      [name, email, hash, phone || null]
    );

    const token = jwt.sign(
      { id: result.insertId, email, role: 'customer' },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: result.insertId, name, email, role: 'customer' }
    });

  } catch (e) {
    console.error('Register error:', e.message);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ message: 'Email and password required' });

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  const device = req.headers['user-agent'];

  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email=?', [email]);

    if (!rows.length) {
      await logLogin(null, email, ip, device, 'failed');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      await logLogin(user.id, user.name, ip, device, 'failed');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    await logLogin(user.id, user.name, ip, device, 'success');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '7d' }
    );

    res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });

  } catch (e) {
    console.error('Login error:', e.message);
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// Get profile
router.get('/me', require('../middleware/auth').auth, async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT id, name, email, role, phone, created_at FROM users WHERE id=?',
      [req.user.id]
    );
    if (!rows.length)
      return res.status(404).json({ message: 'User not found' });

    res.json(rows[0]);
  } catch (e) {
    console.error('Profile error:', e.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;