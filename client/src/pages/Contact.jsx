import { useState } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast.error('Please fill all fields');
    setLoading(true);
    try {
      await api.post('/contact', form);
      setSent(true);
      toast.success('Message sent! We\'ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <div className="container">
          <span className="section-label">📞 Get in Touch</span>
          <h1>Contact Us</h1>
          <p>We'd love to hear from you!</p>
        </div>
      </div>

      <div className="container">
        <div className="contact-grid">
          <div className="contact-info">
            <h3>Reach Us</h3>
            <div className="info-items">
              <div className="info-item glass-card">
                <div className="info-icon">📍</div>
                <div>
                  <strong>Address</strong>
                  <p>Hungry Platter, Bachupally<br />Hyderabad, Telangana 500090</p>
                </div>
              </div>
              <div className="info-item glass-card">
                <div className="info-icon">📞</div>
                <div>
                  <strong>Phone</strong>
                  <p><a href="tel:+919876543210">+91 98765 43210</a></p>
                </div>
              </div>
              <div className="info-item glass-card">
                <div className="info-icon">📧</div>
                <div>
                  <strong>Email</strong>
                  <p><a href="mailto:hungryplattervisit@gmail.com">hungryplattervisit@gmail.com</a></p>
                </div>
              </div>
              <div className="info-item glass-card">
                <div className="info-icon">🕐</div>
                <div>
                  <strong>Hours</strong>
                  <p>Mon–Sun: 7:00 AM – 11:00 PM</p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/919876543210?text=Hello%2C%20I%20want%20to%20know%20more%20about%20Hungry%20Platter!"
              target="_blank"
              rel="noreferrer"
              className="whatsapp-contact-btn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat on WhatsApp
            </a>
          </div>

          <div className="contact-form-wrap glass-card">
            <h3>Send a Message</h3>
            {sent && (
              <div className="sent-banner">
                ✅ Message sent! We'll reply within 24 hours.
              </div>
            )}
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label>Your Name *</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Full name" required />
              </div>
              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" required />
              </div>
              <div className="form-group">
                <label>Message *</label>
                <textarea rows={5} value={form.message} onChange={e => set('message', e.target.value)} placeholder="Tell us how we can help..." required />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Sending...' : '📨 Send Message'}
              </button>
            </form>
          </div>
        </div>

        {/* Map */}
        <div className="map-section">
          <h3>Find Us</h3>
          <div className="map-container glass-card">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3805.2!2d78.3758!3d17.5408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb8e7b4b4b4b4b%3A0x0!2sBachupally%2C+Hyderabad%2C+Telangana!5e0!3m2!1sen!2sin!4v1"
              width="100%"
              height="350"
              style={{ border: 0, borderRadius: 12 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Hungry Platter Location"
            />
            <a
              href="https://maps.google.com/?q=Bachupally,Hyderabad,Telangana"
              target="_blank"
              rel="noreferrer"
              className="open-maps-btn"
            >
              📍 Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
