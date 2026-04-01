import biryaniImg from '../assets/bowl-removebg-preview.png';
import woodenBg from '../assets/wooden-background.jpg.jpeg';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import kitchenImg from '../assets/kitchen.png';
import './Home.css';

const STATS = [
  { value: '500+', label: 'Happy Customers' },
  { value: '50+', label: 'Authentic Dishes' },
  { value: '5★', label: 'Average Rating' },
  { value: '5+', label: 'Years of Excellence' },
];

export default function Home() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, setIsOpen } = useCart();

  useEffect(() => {
    api.get('/menu/featured')
      .then(r => setFeatured(r.data))
      .catch(() => setFeatured([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdd = (item) => {
    addToCart(item);
    toast.success(`${item.name} added to cart!`);
    setIsOpen(true);
  };

  return (
    <div className="home">

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-overlay" />
          <img src={woodenBg} alt="hero" className="hero-img" />
        </div>

        {/* Spinning Bowl - no text on it */}
        <div className="hero-bowl-wrap">
          <img src={biryaniImg} alt="biryani" className="hero-bowl-img" />
          <div className="hero-bowl-glow" />
        </div>

        {/* Centered Text Content */}
        <div className="hero-content">
          <span className="badge badge-accent animate-fade-up" style={{ 
  animationDelay: '0.1s', 
  opacity: 0,
  background: 'rgba(212,168,85,0.25)',
  border: '1px solid rgba(212,168,85,0.8)',
  color: '#FFD700',
  padding: '8px 18px',
  borderRadius: '50px',
  fontWeight: '700',
  letterSpacing: '2px',
  textShadow: '0 0 12px rgba(255,215,0,0.8)',
  boxShadow: '0 0 20px rgba(212,168,85,0.4)'
}}>
  🌶️ Bachupally, Hyderabad
</span>
          <h1 className="hero-title animate-fade-up" style={{ animationDelay: '0.25s', opacity: 0 }}>
            THE HUNGRY<br /><em>PLATTER</em>
          </h1>
          <p className="hero-sub animate-fade-up" style={{ animationDelay: '0.35s', opacity: 0 }}>
            Taste the authentic flavors of Hyderabad
          </p>
          
        </div>
        <div className="hero-btn-left animate-fade-up" style={{ animationDelay: '0.45s', opacity: 0 }}>
  <Link to="/menu" className="btn btn-primary">🍛 View Menu</Link>
</div>
<div className="hero-btn-right animate-fade-up" style={{ animationDelay: '0.45s', opacity: 0 }}>
  <Link to="/reserve" className="btn btn-outline">📅 Reserve Table</Link>
</div>

        <div className="hero-scroll">
          <span>Scroll to explore</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Stats */}
      <section className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {STATS.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-value">{s.value}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="section-label">✨ Chef's Selection</span>
            <h2 className="section-title">Featured Dishes</h2>
            <div className="divider" />
            <p className="section-desc">Our most-loved dishes, crafted with the finest ingredients and traditional recipes passed down through generations.</p>
          </div>

          {loading ? (
            <div className="dish-grid">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="dish-card skeleton" style={{ height: 340 }} />
              ))}
            </div>
          ) : (
            <div className="dish-grid">
              {featured.map((dish, i) => (
                <div key={dish.id} className="dish-card" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="dish-img-wrap">
                    <img src={dish.image_url} alt={dish.name} onError={e => e.target.src = 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400'} />
                    <span className="dish-category-tag">{dish.category}</span>
                  </div>
                  <div className="dish-info">
                    <h3>{dish.name}</h3>
                    <p>{dish.description}</p>
                    <div className="dish-footer">
                      <span className="dish-price">₹{dish.price}</span>
                      <button className="btn btn-primary" style={{ padding: '8px 18px', fontSize: '13px', borderRadius: '8px' }} onClick={() => handleAdd(dish)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link to="/menu" className="btn btn-outline">View Full Menu →</Link>
          </div>
        </div>
      </section>

      {/* About strip */}
      <section className="about-strip">
        <div className="container">
          <div className="about-strip-inner">
            <div className="about-strip-text">
              <span className="section-label">Our Story</span>
              <h2>A Legacy of Flavour<br />Born in Hyderabad</h2>
              <div className="divider" />
              <p>Hungry Platter was founded with a simple dream: to bring the soul of authentic Indian cooking to every table in Bachupally. Our chefs use age-old recipes, fresh local produce, and the finest spices to craft dishes that make you feel at home.</p>
              <div style={{ marginTop: 24 }}>
                <Link to="/about" className="btn btn-primary">Our Story →</Link>
              </div>
            </div>
            <div className="about-strip-images">
              <div className="kitchen-anim-wrap">
                <img src={kitchenImg} alt="Our Kitchen" className="kitchen-anim-img" />
                <div className="kitchen-light-flicker" />
                <div className="kitchen-overlay" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-inner glass-card">
            <h2>Ready for an Unforgettable Meal?</h2>
            <p>Book your table now or order online. We're open 7 days a week!</p>
            <div className="cta-btns">
              <Link to="/reserve" className="btn btn-primary">📅 Book a Table</Link>
              <Link to="/menu" className="btn btn-outline">🛒 Order Online</Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}