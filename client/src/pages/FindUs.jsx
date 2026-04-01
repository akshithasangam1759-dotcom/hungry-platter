import './FindUs.css';

export default function FindUs() {
  return (
    <div className="findus-page">
      <div className="findus-hero">
        <div className="container">
          <span className="section-label">📍 Location</span>
          <h1>Find Us</h1>
          <p>We're easy to find in the heart of Bachupally</p>
        </div>
      </div>

      <div className="container">
        <div className="findus-grid">
          <div className="findus-info">
            <div className="location-card glass-card">
              <h3>🍽️ Hungry Platter</h3>
              <div className="location-details">
                <div className="ld-row">
                  <span className="ld-icon">📍</span>
                  <div>
                    <strong>Address</strong>
                    <p>Bachupally, Hyderabad<br />Telangana – 500090, India</p>
                  </div>
                </div>
                <div className="ld-row">
                  <span className="ld-icon">📞</span>
                  <div>
                    <strong>Phone</strong>
                    <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                  </div>
                </div>
                <div className="ld-row">
                  <span className="ld-icon">🕐</span>
                  <div>
                    <strong>Hours</strong>
                    <p>Every Day: 7:00 AM – 11:00 PM</p>
                  </div>
                </div>
                <div className="ld-row">
                  <span className="ld-icon">🚗</span>
                  <div>
                    <strong>Parking</strong>
                    <p>Free parking available on premises</p>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Bachupally,Hyderabad,Telangana"
                target="_blank"
                rel="noreferrer"
                className="directions-btn btn btn-primary"
              >
                📍 Get Directions
              </a>
            </div>

            <div className="landmarks-card glass-card">
              <h4>🗺️ Nearby Landmarks</h4>
              <ul className="landmarks-list">
                <li>🏥 5 min from Bachupally Circle</li>
                <li>🚌 Bachupally Bus Stop – 2 min walk</li>
              </ul>
            </div>
          </div>

          <div className="map-embed-wrap glass-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15221.6!2d78.3758!3d17.5408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e7c0ddbe339%3A0xbf54c04b4eb66117!2sBachupally%2C+Hyderabad%2C+Telangana!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 12, minHeight: 400 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hungry Platter – Bachupally, Hyderabad"
            />
          </div>
        </div>

        <div className="transport-section">
          <h3>🚌 How to Get Here</h3>
          <div className="transport-grid">
            {[
              { icon: '🚌', title: 'By Bus', desc: 'TSRTC buses 216, 217D stop at Bachupally circle, 2 min walk.' },
              { icon: '🚗', title: 'By Car / Cab', desc: 'Search "Bachupally, Hyderabad" on Google Maps or Ola/Uber.' },
              { icon: '🛵', title: 'By Auto', desc: 'Auto rickshaws available from Miyapur metro station.' },
              { icon: '🚇', title: 'By Metro', desc: 'Nearest metro: Miyapur (Blue Line), then auto/cab 10 min.' },
            ].map((t, i) => (
              <div key={i} className="transport-card glass-card">
                <div className="t-icon">{t.icon}</div>
                <h5>{t.title}</h5>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
