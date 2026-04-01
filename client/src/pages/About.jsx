import foodSpread from '../assets/spices.jpeg';
import './About.css';


const TEAM = [
  { name: 'Priya Patel', role: 'Head Chef', emoji: '👩‍🍳', desc: '15 years of mastering authentic Hyderabadi cuisine' },
  { name: 'Varun Kumar', role: 'Pastry Chef', emoji: '👨‍🍳', desc: 'Expert in traditional Indian sweets and desserts' },
  { name: 'Akanksha Sharma', role: 'Restaurant Manager', emoji: '🤵‍♀️', desc: 'Ensuring every guest has an unforgettable experience' },
  { name: 'Sameer', role: 'Sous Chef', emoji: '👨‍🍳', desc: 'Crafting bold flavors with precision and passion' },
];

const VALUES = [
  { icon: '🌿', title: 'Fresh Ingredients', desc: 'We source fresh produce daily from local farmers and markets.' },
  { icon: '🔥', title: 'Traditional Recipes', desc: 'Age-old recipes passed down through generations, cooked with love.' },
  { icon: '❤️', title: 'Cooked with Passion', desc: 'Every dish is crafted with care, attention and authentic flavors.' },
  { icon: '🌟', title: 'Premium Experience', desc: 'We believe fine dining should be accessible to everyone.' },
];

export default function About() {
  return (
    <div className="about-page">
      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-bg">
          <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80" alt="restaurant" />
          <div className="about-hero-overlay" />
        </div>
        <div className="container about-hero-content">
          <span className="section-label">🍽️ Our Story</span>
          <h1>The Heart Behind<br /><em>Hungry Platter</em></h1>
          <p>Where tradition meets taste, and every meal is a memory</p>
        </div>
      </section>

      {/* Story */}
      <section className="section">
        <div className="container">
          <div className="story-grid">
            <div className="story-images">
              <img src={foodSpread} alt="food spread" className="story-img-main" />
<img src="https://5.imimg.com/data5/SELLER/Default/2023/2/QR/CB/HY/51747533/spice-garam-masala-500x500.JPG" alt="spices" className="story-img-sm" />
            </div>
            <div className="story-text">
              <span className="section-label">🌶️ How It Started</span>
              <h2>A Dream Born in a Kitchen in Bachupally</h2>
              <div className="divider" />
              <p>Hungry Platter was founded in 2019 by a group of food-passionate friends who grew up eating authentic home-cooked Indian food. Frustrated by the lack of genuine flavors in the area, they decided to open a restaurant that stayed true to its roots.</p>
              <p style={{ marginTop: 16, color: 'var(--text-secondary)', lineHeight: 1.8 }}>Starting with just a small kitchen and five tables, Hungry Platter quickly became the go-to spot for anyone craving real Hyderabadi biryani, crispy dosas, and melt-in-your-mouth curries. Today, we serve hundreds of happy customers every day.</p>
              <div className="story-stats">
                <div className="st-stat"><span className="st-val">2019</span><span className="st-label">Founded</span></div>
                <div className="st-stat"><span className="st-val">500+</span><span className="st-label">Regulars</span></div>
                <div className="st-stat"><span className="st-val">50+</span><span className="st-label">Dishes</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-section">
        <div className="container">
          <div className="mv-grid">
            <div className="mv-card glass-card">
              <div className="mv-icon">🎯</div>
              <h3>Our Mission</h3>
              <p>To serve authentic Indian cuisine made with the finest ingredients, preserving traditional flavors while creating a warm, welcoming environment where every guest feels at home.</p>
            </div>
            <div className="mv-card glass-card accent-border">
              <div className="mv-icon">🔭</div>
              <h3>Our Vision</h3>
              <p>To become Bachupally's most-loved restaurant — a place where families gather, friendships are forged, and the soul of Indian cooking is celebrated with every single bite.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center' }}>
            <span className="section-label">💎 What We Stand For</span>
            <h2 className="section-title">Our Values</h2>
            <div className="divider" style={{ margin: '16px auto 0' }} />
          </div>
          <div className="values-grid">
            {VALUES.map((v, i) => (
              <div key={i} className="value-card glass-card">
                <div className="value-icon">{v.icon}</div>
                <h4>{v.title}</h4>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: '80px 0' }}>
        <div className="container">
          <div className="section-head" style={{ textAlign: 'center' }}>
            <span className="section-label">👨‍🍳 The People</span>
            <h2 className="section-title">Meet Our Team</h2>
            <div className="divider" style={{ margin: '16px auto 0' }} />
          </div>
          <div className="team-grid">
            {TEAM.map((m, i) => (
              <div key={i} className="team-card glass-card">
                <div className="team-avatar">{m.emoji}</div>
                <h4>{m.name}</h4>
                <span className="team-role">{m.role}</span>
                <p>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
