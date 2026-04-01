import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import toast from 'react-hot-toast';
import './Checkout.css';

export default function Checkout() {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    customer_name: user?.name || '',
    customer_email: user?.email || '',
    customer_phone: '',
    order_type: 'dine-in',
    notes: ''
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const WHATSAPP = '919876543210';

  const handleWhatsApp = () => {
    if (!cart.length) return toast.error('Cart is empty!');
    const lines = cart.map(i => `• ${i.name} x${i.quantity} = ₹${(i.price * i.quantity).toFixed(0)}`).join('\n');
    const msg = encodeURIComponent(`🍽️ *New Order - Hungry Platter*\n\nName: ${form.customer_name}\nPhone: ${form.customer_phone || 'N/A'}\nType: ${form.order_type}\n\n${lines}\n\n*Total: ₹${total.toFixed(0)}*\n${form.notes ? `Notes: ${form.notes}` : ''}`);
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cart.length) return toast.error('Cart is empty!');
    if (!form.customer_name) return toast.error('Please enter your name');
    setLoading(true);
    try {
      await api.post('/orders', {
        ...form,
        items: cart.map(i => ({ id: i.id, name: i.name, price: i.price, quantity: i.quantity })),
        total_amount: total
      });
      setSuccess(true);
      clearCart();
      toast.success('Order placed successfully!');
    } catch (e) {
      toast.error(e.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (success) return (
    <div className="checkout-page">
      <div className="container">
        <div className="success-box glass-card">
          <div className="success-icon">🎉</div>
          <h2>Order Placed!</h2>
          <p>Thank you for your order. We'll prepare it right away!</p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 24 }}>
            <button className="btn btn-primary" onClick={() => navigate('/menu')}>Order More</button>
            <button className="btn btn-outline" onClick={() => navigate('/')}>Back to Home</button>
          </div>
        </div>
      </div>
    </div>
  );

  if (!cart.length) return (
    <div className="checkout-page">
      <div className="container">
        <div className="success-box glass-card">
          <div style={{ fontSize: 48 }}>🛒</div>
          <h2>Cart is Empty</h2>
          <p>Add some delicious dishes before checking out!</p>
          <button className="btn btn-primary" style={{ marginTop: 24 }} onClick={() => navigate('/menu')}>View Menu</button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="checkout-page">
      <div className="container">
        <div className="checkout-header">
          <span className="section-label">🛒 Almost There</span>
          <h1>Checkout</h1>
        </div>

        <div className="checkout-grid">
          <form className="checkout-form glass-card" onSubmit={handleSubmit}>
            <h3>Your Details</h3>
            <div className="form-group">
              <label>Full Name *</label>
              <input value={form.customer_name} onChange={e => set('customer_name', e.target.value)} placeholder="Your name" required />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Email</label>
                <input type="email" value={form.customer_email} onChange={e => set('customer_email', e.target.value)} placeholder="email@example.com" />
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input value={form.customer_phone} onChange={e => set('customer_phone', e.target.value)} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="form-group">
              <label>Order Type</label>
              <select value={form.order_type} onChange={e => set('order_type', e.target.value)}>
                <option value="dine-in">Dine In</option>
                <option value="takeaway">Takeaway</option>
                <option value="delivery">Delivery</option>
              </select>
            </div>
            <div className="form-group">
              <label>Special Instructions</label>
              <textarea rows={3} value={form.notes} onChange={e => set('notes', e.target.value)} placeholder="Any dietary restrictions, special requests..." />
            </div>

            <div className="checkout-btns">
              <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} disabled={loading}>
                {loading ? 'Placing Order...' : '✅ Place Order'}
              </button>
              <button type="button" className="whatsapp-checkout-btn" onClick={handleWhatsApp}>
                🟢 Order via WhatsApp
              </button>
            </div>
          </form>

          <div className="order-summary glass-card">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cart.map(item => (
                <div key={item.id} className="summary-item">
                  <div className="si-info">
                    <span className="si-name">{item.name}</span>
                    <span className="si-qty">x{item.quantity}</span>
                  </div>
                  <span className="si-price">₹{(item.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span>Total Amount</span>
              <span className="total-price">₹{total.toFixed(0)}</span>
            </div>
            <div className="summary-note">
              <p>📍 Hungry Platter, Bachupally, Hyderabad</p>
              <p>📞 +91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
