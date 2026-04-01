const router = require('express').Router();
const db = require('../config/db');
const { auth, adminOnly } = require('../middleware/auth');

// Get all menu items
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM menu WHERE is_available=1';
    const params = [];
    if (category) { query += ' AND category=?'; params.push(category); }
    query += ' ORDER BY category, name';
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// Get featured items
router.get('/featured', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM menu WHERE is_available=1 AND is_featured=1 LIMIT 6');
    res.json(rows);
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Add menu item (admin)
router.post('/', auth, adminOnly, async (req, res) => {
  const { name, description, price, category, image_url, is_featured } = req.body;
  if (!name || !price || !category) return res.status(400).json({ message: 'Name, price, category required' });
  try {
    const [result] = await db.query(
      'INSERT INTO menu (name,description,price,category,image_url,is_featured) VALUES (?,?,?,?,?,?)',
      [name, description || '', price, category, image_url || '', is_featured ? 1 : 0]
    );
    res.json({ id: result.insertId, message: 'Menu item added' });
  } catch (e) {
    res.status(500).json({ message: 'Server error', error: e.message });
  }
});

// Update menu item (admin)
router.put('/:id', auth, adminOnly, async (req, res) => {
  const { name, description, price, category, image_url, is_available, is_featured } = req.body;
  try {
    await db.query(
      'UPDATE menu SET name=?,description=?,price=?,category=?,image_url=?,is_available=?,is_featured=? WHERE id=?',
      [name, description, price, category, image_url, is_available ? 1 : 0, is_featured ? 1 : 0, req.params.id]
    );
    res.json({ message: 'Menu item updated' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete menu item (admin)
router.delete('/:id', auth, adminOnly, async (req, res) => {
  try {
    await db.query('DELETE FROM menu WHERE id=?', [req.params.id]);
    res.json({ message: 'Menu item deleted' });
  } catch (e) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
