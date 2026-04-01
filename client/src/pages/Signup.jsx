import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './Auth.css';

export default function Signup() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) return toast.error('Please fill all required fields');
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    if (form.password !== form.confirm) return toast.error('Passwords do not match');
    setLoading(true);
    try {
      const res = await api.post('/auth/register', { name: form.name, email: form.email, phone: form.phone, password: form.password });
      login(res.data.token, res.data.user);
      toast.success(`Welcome to Hungry Platter, ${res.data.user.name}!`);
      navigate('/');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-bg" />
      <div className="auth-card glass-card">
        <div className="auth-logo">🍽️ HungryPlatter</div>
        <h2>Create Account</h2>
        <p className="auth-sub">Join us for exclusive dining experiences</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name *</label>
            <input value={form.name} onChange={e => set('name', e.target.value)} placeholder="Your full name" required />
          </div>
          <div className="form-group">
            <label>Email Address *</label>
            <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="you@example.com" required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98765 43210" />
          </div>
          <div className="form-group">
            <label>Password *</label>
            <input type="password" value={form.password} onChange={e => set('password', e.target.value)} placeholder="Min 6 characters" required />
          </div>
          <div className="form-group">
            <label>Confirm Password *</label>
            <input type="password" value={form.confirm} onChange={e => set('confirm', e.target.value)} placeholder="Repeat your password" required />
          </div>

          <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </div>
    </div>
  );
}
