import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { count, setIsOpen } = useCart();
  const { theme, toggle } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/reserve', label: 'Reserve' },
    { to: '/find-us', label: 'Find Us' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">🍽️</span>
          <span className="logo-text">Hungry<span>Platter</span></span>
        </Link>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={location.pathname === l.to ? 'active' : ''}>
                {l.label}
              </Link>
            </li>
          ))}
          {user?.role === 'admin' && (
            <li><Link to="/admin" className={location.pathname.startsWith('/admin') ? 'active' : ''}>Admin</Link></li>
          )}
        </ul>

        <div className="nav-actions">
          <button className="icon-btn" onClick={toggle} title="Toggle theme">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button className="icon-btn cart-btn" onClick={() => setIsOpen(true)}>
            🛒
            {count > 0 && <span className="cart-badge">{count}</span>}
          </button>

          {user ? (
            <div className="user-menu">
              <button className="user-btn">
                <span className="user-avatar">{user.name[0].toUpperCase()}</span>
                <span className="user-name">{user.name.split(' ')[0]}</span>
              </button>
              <div className="user-dropdown">
                <Link to="/profile">My Orders</Link>
                {user.role === 'admin' && <Link to="/admin">Admin Panel</Link>}
                <button onClick={() => { logout(); navigate('/'); }}>Logout</button>
              </div>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '13px' }}>
              Login
            </Link>
          )}

          <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
  );
}
