import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">🍽️ Hungry<span>Platter</span></div>
            <p>Authentic Indian cuisine crafted with love, served with warmth. Experience the true flavors of India in every bite.</p>
            <div className="social-links">
              <a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="social-btn">🟢 WhatsApp</a>
              <a href="mailto:hungryplattervisit@gmail.com" className="social-btn">📧 Email</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/menu">Menu</Link></li>
              <li><Link to="/reserve">Reserve Table</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Menu</h4>
            <ul>
              <li><Link to="/menu?category=breakfast">Breakfast</Link></li>
              <li><Link to="/menu?category=lunch">Lunch</Link></li>
              <li><Link to="/menu?category=dinner">Dinner</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Contact</h4>
            <ul className="contact-list">
              <li>📍 Bachupally, Hyderabad, Telangana 500090</li>
              <li>📞 +91 98765 43210</li>
              <li>📧hungryplattervisit@gmail.com </li>
              <li>🕐 Mon–Sun: 7:00 AM – 11:00 PM</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Hungry Platter. All rights reserved. Made with ❤️ in Hyderabad.</p>
        </div>
      </div>
    </footer>
  );
}
