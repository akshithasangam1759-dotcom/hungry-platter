-- ============================================
-- HUNGRY PLATTER - MySQL Database Schema
-- Run this file in your MySQL client
-- ============================================

CREATE DATABASE IF NOT EXISTS hungry_platter;
USE hungry_platter;

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('customer', 'admin') DEFAULT 'customer',
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Menu Table
CREATE TABLE IF NOT EXISTS menu (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  category ENUM('breakfast', 'lunch', 'dinner') NOT NULL,
  image_url VARCHAR(500),
  is_available BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  customer_name VARCHAR(100) NOT NULL,
  customer_email VARCHAR(150),
  customer_phone VARCHAR(20),
  items JSON NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  status ENUM('pending','confirmed','preparing','ready','delivered','cancelled') DEFAULT 'pending',
  order_type ENUM('dine-in','takeaway','delivery') DEFAULT 'dine-in',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150),
  phone VARCHAR(20) NOT NULL,
  date DATE NOT NULL,
  time TIME NOT NULL,
  guests INT NOT NULL,
  special_requests TEXT,
  status ENUM('pending','confirmed','cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Contact Messages Table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SEED DATA - Default Admin User
-- Password: admin123 (bcrypt hashed)
-- ============================================
INSERT INTO users (name, email, password, role) VALUES
('Admin', 'admin@hungryplatter.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin')
ON DUPLICATE KEY UPDATE name=name;

-- ============================================
-- SEED DATA - Menu Items
-- ============================================
INSERT INTO menu (name, description, price, category, image_url, is_featured) VALUES
-- BREAKFAST
('Masala Dosa', 'Crispy golden dosa with spiced potato filling, sambar & chutneys', 89.00, 'breakfast', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', TRUE),
('Idli Vada Combo', 'Soft steamed idlis with crispy vadas, sambar & coconut chutney', 79.00, 'breakfast', 'https://images.unsplash.com/photo-1630383249896-424e482df921?w=400', FALSE),
('Pesarattu', 'Green moong dal crepes with upma stuffing, ginger chutney', 99.00, 'breakfast', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400', FALSE),
('Poha', 'Light flattened rice with peanuts, curry leaves & spices', 59.00, 'breakfast', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', FALSE),
('Upma', 'Semolina porridge with vegetables, mustard seeds & curry leaves', 65.00, 'breakfast', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', FALSE),
('Puri Bhaji', 'Fluffy deep-fried puris with spiced potato curry', 89.00, 'breakfast', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', TRUE),

-- LUNCH
('Hyderabadi Chicken Biryani', 'Dum-cooked fragrant rice with tender chicken, saffron & spices', 299.00, 'lunch', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', TRUE),
('Veg Biryani', 'Aromatic basmati rice with seasonal vegetables & whole spices', 199.00, 'lunch', 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400', FALSE),
('Dal Makhani', 'Slow-cooked black lentils in rich tomato-butter gravy', 179.00, 'lunch', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', TRUE),
('Paneer Butter Masala', 'Cottage cheese cubes in velvety tomato-cashew gravy', 219.00, 'lunch', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', FALSE),
('Mutton Curry', 'Slow-cooked tender mutton in Hyderabadi spice blend', 349.00, 'lunch', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', FALSE),
('Thali (Veg)', 'Complete meal with 2 sabzis, dal, rice, roti, raita & dessert', 249.00, 'lunch', 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400', TRUE),

-- DINNER
('Butter Chicken', 'Tandoor-smoked chicken in rich makhani gravy with naan', 319.00, 'dinner', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', TRUE),
('Chicken 65', 'Spicy deep-fried chicken with curry leaves & red chillies', 249.00, 'dinner', 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400', FALSE),
('Palak Paneer', 'Cottage cheese in creamy spinach gravy with garlic', 199.00, 'dinner', 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400', FALSE),
('Garlic Naan', 'Soft tandoor bread brushed with garlic butter & herbs', 49.00, 'dinner', 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400', FALSE),
('Gulab Jamun', 'Soft milk-solid dumplings soaked in rose-cardamom syrup', 89.00, 'dinner', 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400', TRUE),
('Lassi (Sweet/Salted)', 'Chilled yogurt drink, thick & refreshing', 79.00, 'dinner', 'https://images.unsplash.com/photo-1571091655789-405eb7a3a3a8?w=400', FALSE);
