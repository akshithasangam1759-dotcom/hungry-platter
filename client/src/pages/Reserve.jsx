import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './Reserve.css';

export default function Reserve() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    special_requests: ''
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.date || !form.time) {
      return toast.error('Please fill all required fields');
    }
    const today = new Date(); today.setHours(0,0,0,0);
    if (new Date(form.date) < today) return toast.error('Please select a future date');

    setLoading(true);
    try {
      await api.post('/reservations', form);
      setSuccess(true);
      toast.success('Table reserved successfully!');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Reservation failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="reserve-page">
      <div className="container">
        <div className="success-box glass-card">
          <div className="success-icon">🎊</div>
          <h2>Table Reserved!</h2>
          <p>Your table is confirmed. We look forward to welcoming you!</p>
          <div className="confirmed-details">
            <div className="cd-item"><span>📅 Date</span><strong>{form.date}</strong></div>
            <div className="cd-item"><span>🕐 Time</span><strong>{form.time}</strong></div>
            <div className="cd-item"><span>👥 Guests</span><strong>{form.guests}</strong></div>
          </div>
          <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => { setSuccess(false); setForm(f => ({ ...f, date: '', time: '', special_requests: '' })); }}>
            Make Another Reservation
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="reserve-page">
      <div className="reserve-hero">
        <div className="container">
          <span className="section-label">📅 Reserve Your Spot</span>
          <h1>Book a Table</h1>
          <p>Join us for an unforgettable dining experience</p>
        </div>
      </div>

      <div className="container">
        <div className="reserve-grid">
          <form className="reserve-form glass-card" onSubmit={handleSubmit}>
            <h3>Reservation Details</h3>

            <div className="form-row">
              <div className="form-group">
                <label>Full Name *</label>
                <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your name" required />
              </div>
              <div className="form-group">
                <label>Phone *</label>
                <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" required />
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Date *</label>
                <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]} required />
              </div>
              <div className="form-group">
                <label>Time *</label>
                <input type="time" value={form.time} onChange={e => set('time', e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label>Number of Guests *</label>
              <div className="guests-control">
                <button type="button" onClick={() => set('guests', Math.max(1, form.guests - 1))}>−</button>
                <span>{form.guests} {form.guests === 1 ? 'Guest' : 'Guests'}</span>
                <button type="button" onClick={() => set('guests', Math.min(20, form.guests + 1))}>+</button>
              </div>
            </div>

            <div className="form-group">
              <label>Special Requests</label>
              <textarea rows={3} value={form.special_requests} onChange={e => set('special_requests', e.target.value)}
                placeholder="Birthday celebration, dietary restrictions, seating preference..." />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? 'Confirming...' : '📅 Confirm Reservation'}
            </button>
          </form>

          <div className="reserve-info">
            <div className="info-card glass-card">
              <h4>📍 Location</h4>
              <p>Hungry Platter<br />Bachupally, Hyderabad<br />Telangana 500090</p>
            </div>
            <div className="info-card glass-card">
              <h4>🕐 Opening Hours</h4>
              <div className="hours-list">
                <div className="hour-row"><span>Monday – Friday</span><span>7:00 AM – 11:00 PM</span></div>
                <div className="hour-row"><span>Saturday – Sunday</span><span>7:00 AM – 11:30 PM</span></div>
              </div>
            </div>
            <div className="info-card glass-card">
              <h4>📞 Contact</h4>
              <p>+91 98765 43210</p>
              <p style={{ marginTop: 4, fontSize: 13 }}>info@hungryplatter.com</p>
            </div>
            <div className="info-card glass-card">
              <h4>ℹ️ Notes</h4>
              <ul className="notes-list">
                <li>Reservations held for 15 mins</li>
                <li>Groups over 10 call us directly</li>
                <li>Special occasions? Let us know!</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
